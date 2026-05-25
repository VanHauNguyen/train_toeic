import { Injectable } from '@nestjs/common';
import { SkillLevel } from '@prisma/client';
import { GeneratedQuestion } from './content.types';
import { QUESTION_TOPICS, TOEIC_PART5_QUESTION_BANK } from './data/question-bank';

@Injectable()
export class QuestionGeneratorService {
  generate(input: { topic?: string; difficulty?: string; count?: number }): GeneratedQuestion[] {
    const topic = this.normalizeTopic(input.topic);
    const difficulty = this.normalizeDifficulty(input.difficulty);
    const count = Math.min(Math.max(Number(input.count ?? 5), 1), 50);
    const exactPool = this.byDifficulty(
      TOEIC_PART5_QUESTION_BANK.filter((question) => question.topic === topic),
      difficulty,
    );
    const mixedPool = this.byDifficulty(TOEIC_PART5_QUESTION_BANK, difficulty);
    const pool = exactPool.length >= count ? exactPool : this.unique([...exactPool, ...mixedPool]);
    const offset = this.stableOffset(`${topic}:${difficulty}:${count}`, pool.length);

    return Array.from({ length: Math.min(count, pool.length) }, (_, index) => {
      const item = pool[(offset + index) % pool.length];
      return { ...item, difficulty };
    });
  }

  private byDifficulty(pool: GeneratedQuestion[], difficulty: SkillLevel) {
    if (difficulty === SkillLevel.BEGINNER) {
      return pool.filter((question) => question.difficulty === SkillLevel.BEGINNER);
    }
    if (difficulty === SkillLevel.INTERMEDIATE) {
      return pool.filter((question) => question.difficulty !== SkillLevel.ADVANCED);
    }
    return pool;
  }

  private unique(pool: GeneratedQuestion[]) {
    const seen = new Set<string>();
    return pool.filter((question) => {
      if (seen.has(question.id)) return false;
      seen.add(question.id);
      return true;
    });
  }

  private normalizeTopic(topic = 'mixed') {
    const normalized = topic.toLowerCase().trim().replace(/[_-]/g, ' ');
    if (!normalized || normalized === 'mixed') return 'mixed';
    if (normalized.includes('prep') || normalized.includes('介')) return 'prepositions';
    if (normalized.includes('tense') || normalized.includes('時態')) return 'tense';
    if (normalized.includes('conjunction') || normalized.includes('連接')) return 'conjunctions';
    if (normalized.includes('form') || normalized.includes('字形')) return 'word forms';
    if (normalized.includes('condition') || normalized.includes('條件')) return 'conditionals';
    if (normalized.includes('passive') || normalized.includes('被動')) return 'passive voice';
    if (normalized.includes('adverb') || normalized.includes('副詞') || normalized.includes('形容')) return 'adjective adverb';
    if (normalized.includes('agreement') || normalized.includes('主謂')) return 'subject verb agreement';
    if (normalized.includes('vocab') || normalized.includes('單字') || normalized.includes('語彙')) return 'vocabulary';
    return QUESTION_TOPICS.includes(normalized) ? normalized : 'mixed';
  }

  private normalizeDifficulty(difficulty = 'BEGINNER'): SkillLevel {
    const value = difficulty.toUpperCase();
    if (value === SkillLevel.INTERMEDIATE) return SkillLevel.INTERMEDIATE;
    if (value === SkillLevel.ADVANCED) return SkillLevel.ADVANCED;
    return SkillLevel.BEGINNER;
  }

  private stableOffset(seed: string, length: number) {
    if (!length) return 0;
    return [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length;
  }
}
