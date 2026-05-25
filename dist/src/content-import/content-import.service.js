"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentImportService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ContentImportService = class ContentImportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async importVocabularyCsv(dto) {
        const rows = this.parseCsv(dto.csv);
        const imported = [];
        const skipped = [];
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
                        cefrLevel: this.enumValue(client_1.CefrLevel, row.cefrLevel),
                        frequencyScore: Number(row.frequencyScore ?? 0),
                        synonyms: this.splitList(row.synonyms),
                        antonyms: this.splitList(row.antonyms),
                        collocations: this.splitList(row.collocations),
                        source: client_1.ContentSource.IMPORTED,
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
                        cefrLevel: this.enumValue(client_1.CefrLevel, row.cefrLevel),
                        frequencyScore: Number(row.frequencyScore ?? 0),
                        synonyms: this.splitList(row.synonyms),
                        antonyms: this.splitList(row.antonyms),
                        collocations: this.splitList(row.collocations),
                        source: client_1.ContentSource.IMPORTED,
                        sourceRef: dto.sourceRef,
                    },
                });
                imported.push(item);
            }
            catch (error) {
                skipped.push({ word, reason: error instanceof Error ? error.message : 'Unknown import error' });
            }
        }
        return { importedCount: imported.length, skippedCount: skipped.length, skipped, items: imported };
    }
    async importQuestionJson(dto) {
        const imported = [];
        const skipped = [];
        for (const raw of dto.questions) {
            const prompt = String(raw.prompt ?? '').trim();
            const toeicPart = this.enumValue(client_1.ToeicPart, raw.toeicPart);
            const type = this.enumValue(client_1.QuestionType, raw.type) ?? client_1.QuestionType.READING;
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
                const value = option;
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
                    difficulty: this.enumValue(client_1.SkillLevel, raw.difficulty) ?? client_1.SkillLevel.BEGINNER,
                    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
                    source: client_1.ContentSource.IMPORTED,
                    sourceRef: dto.sourceRef,
                    approvalStatus: dto.approve ? client_1.ApprovalStatus.APPROVED : client_1.ApprovalStatus.PENDING_REVIEW,
                    duplicateKey,
                    options: { create: normalizedOptions },
                },
                include: { options: true },
            });
            imported.push(question);
        }
        return { importedCount: imported.length, skippedCount: skipped.length, skipped, questions: imported };
    }
    parseCsv(csv) {
        const rows = csv.trim().split(/\r?\n/).filter(Boolean);
        if (rows.length < 2)
            throw new common_1.BadRequestException('CSV requires a header row and at least one data row');
        const headers = this.parseCsvLine(rows[0]).map((header) => header.trim());
        return rows.slice(1).map((line) => {
            const values = this.parseCsvLine(line);
            return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
        });
    }
    parseCsvLine(line) {
        const values = [];
        let current = '';
        let quoted = false;
        for (let index = 0; index < line.length; index += 1) {
            const char = line[index];
            if (char === '"' && line[index + 1] === '"') {
                current += '"';
                index += 1;
            }
            else if (char === '"') {
                quoted = !quoted;
            }
            else if (char === ',' && !quoted) {
                values.push(current.trim());
                current = '';
            }
            else {
                current += char;
            }
        }
        values.push(current.trim());
        return values;
    }
    splitList(value) {
        return value ? value.split(/[|;]/).map((item) => item.trim()).filter(Boolean) : [];
    }
    duplicateKey(prompt) {
        return prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 180);
    }
    optionalString(value) {
        return typeof value === 'string' && value.trim() ? value.trim() : undefined;
    }
    enumValue(target, value) {
        return typeof value === 'string' && Object.values(target).includes(value) ? value : undefined;
    }
};
exports.ContentImportService = ContentImportService;
exports.ContentImportService = ContentImportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentImportService);
//# sourceMappingURL=content-import.service.js.map