import { BadRequestException, Injectable } from '@nestjs/common';
import { ApprovalStatus, CefrLevel, ContentSource, Prisma, QuestionType, SkillLevel, ToeicPart } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImportQuestionJsonDto, ImportVocabularyCsvDto } from './dto';

@Injectable()
export class ContentImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importVocabularyCsv(dto: ImportVocabularyCsvDto) {
    const rows = this.parseCsv(dto.csv);
    const imported: unknown[] = [];
    const skipped: { word?: string; reason: string }[] = [];
    for (const row of rows) {
      const word = row.word?.trim();
      const meaningZhTW = row.meaningZhTW?.trim() || row.meaningZhTw?.trim();
      if (!word || !meaningZhTW) {
        skipped.push({ word, reason: 'word and meaningZhTW are required' });
        continue;
      }
      try {
        const item = await this.prisma.vocabulary.upsert({
          where: { word },
          update: {
            meaningZhTW,
            meaningVi: row.meaningVi,
            partOfSpeech: row.partOfSpeech,
            example: row.example,
            exampleZhTW: row.exampleZhTW ?? row.exampleZhTw,
            exampleVi: row.exampleVi,
            tags: this.splitList(row.tags),
            toeicCategory: row.toeicCategory,
            cefrLevel: this.enumValue(CefrLevel, row.cefrLevel),
            frequencyScore: Number(row.frequencyScore ?? 0),
            synonyms: this.splitList(row.synonyms),
            antonyms: this.splitList(row.antonyms),
            collocations: this.splitList(row.collocations),
            source: ContentSource.IMPORTED,
            sourceRef: dto.sourceRef,
          },
          create: {
            word,
            meaningZhTW,
            meaningVi: row.meaningVi,
            partOfSpeech: row.partOfSpeech,
            example: row.example,
            exampleZhTW: row.exampleZhTW ?? row.exampleZhTw,
            exampleVi: row.exampleVi,
            tags: this.splitList(row.tags),
            toeicCategory: row.toeicCategory,
            cefrLevel: this.enumValue(CefrLevel, row.cefrLevel),
            frequencyScore: Number(row.frequencyScore ?? 0),
            synonyms: this.splitList(row.synonyms),
            antonyms: this.splitList(row.antonyms),
            collocations: this.splitList(row.collocations),
            source: ContentSource.IMPORTED,
            sourceRef: dto.sourceRef,
          },
        });
        imported.push(item);
      } catch (error) {
        skipped.push({ word, reason: error instanceof Error ? error.message : 'Unknown import error' });
      }
    }
    return { importedCount: imported.length, skippedCount: skipped.length, skipped, items: imported };
  }

  async importQuestionJson(dto: ImportQuestionJsonDto) {
    const imported: unknown[] = [];
    const skipped: { prompt?: string; reason: string }[] = [];
    for (const raw of dto.questions) {
      const prompt = String(raw.prompt ?? '').trim();
      const toeicPart = this.enumValue(ToeicPart, raw.toeicPart);
      const type = this.enumValue(QuestionType, raw.type) ?? QuestionType.READING;
      const options = Array.isArray(raw.options) ? raw.options : [];
      const correctAnswer = String(raw.correctAnswer ?? raw.correct ?? '').trim().toUpperCase();
      if (!prompt || !toeicPart || options.length !== 4 || !['A', 'B', 'C', 'D'].includes(correctAnswer)) {
        skipped.push({ prompt, reason: 'prompt, toeicPart, 4 options, and correctAnswer A-D are required' });
        continue;
      }
      const duplicateKey = this.duplicateKey(prompt);
      const existing = await this.prisma.question.findFirst({ where: { duplicateKey }, select: { id: true } });
      if (existing) {
        skipped.push({ prompt, reason: 'duplicate question detected' });
        continue;
      }
      const normalizedOptions = options.map((option, index) => {
        const value = option as Record<string, unknown>;
        const label = String(value.label ?? String.fromCharCode(65 + index)).toUpperCase();
        return { label, text: String(value.text ?? ''), isCorrect: label === correctAnswer };
      });
      if (normalizedOptions.some((option) => !option.text) || normalizedOptions.filter((option) => option.isCorrect).length !== 1) {
        skipped.push({ prompt, reason: 'each option needs text and exactly one option must be correct' });
        continue;
      }
      const question = await this.prisma.question.create({
        data: {
          prompt,
          toeicPart,
          type,
          passage: this.optionalString(raw.passage),
          explanation: this.optionalString(raw.explanation),
          explanationZhTW: this.optionalString(raw.explanationZhTW ?? raw.explanationZhTw),
          explanationVi: this.optionalString(raw.explanationVi),
          difficulty: this.enumValue(SkillLevel, raw.difficulty) ?? SkillLevel.BEGINNER,
          tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
          source: ContentSource.IMPORTED,
          sourceRef: dto.sourceRef,
          approvalStatus: dto.approve ? ApprovalStatus.APPROVED : ApprovalStatus.PENDING_REVIEW,
          duplicateKey,
          options: { create: normalizedOptions },
        },
        include: { options: true },
      });
      imported.push(question);
    }
    return { importedCount: imported.length, skippedCount: skipped.length, skipped, questions: imported };
  }

  private parseCsv(csv: string) {
    const rows = csv.trim().split(/\r?\n/).filter(Boolean);
    if (rows.length < 2) throw new BadRequestException('CSV requires a header row and at least one data row');
    const headers = this.parseCsvLine(rows[0]).map((header) => header.trim());
    return rows.slice(1).map((line) => {
      const values = this.parseCsvLine(line);
      return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])) as Record<string, string>;
    });
  }

  private parseCsvLine(line: string) {
    const values: string[] = [];
    let current = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const char = line[index];
      if (char === '"' && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  }

  private splitList(value?: string) {
    return value ? value.split(/[|;]/).map((item) => item.trim()).filter(Boolean) : [];
  }

  private duplicateKey(prompt: string) {
    return prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 180);
  }

  private optionalString(value: unknown) {
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
  }

  private enumValue<T extends Record<string, string>>(target: T, value: unknown): T[keyof T] | undefined {
    return typeof value === 'string' && Object.values(target).includes(value) ? (value as T[keyof T]) : undefined;
  }
}
