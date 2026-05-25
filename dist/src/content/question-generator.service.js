"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const question_bank_1 = require("./data/question-bank");
let QuestionGeneratorService = class QuestionGeneratorService {
    generate(input) {
        const topic = this.normalizeTopic(input.topic);
        const difficulty = this.normalizeDifficulty(input.difficulty);
        const count = Math.min(Math.max(Number(input.count ?? 5), 1), 50);
        const exactPool = this.byDifficulty(question_bank_1.TOEIC_PART5_QUESTION_BANK.filter((question) => question.topic === topic), difficulty);
        const mixedPool = this.byDifficulty(question_bank_1.TOEIC_PART5_QUESTION_BANK, difficulty);
        const pool = exactPool.length >= count ? exactPool : this.unique([...exactPool, ...mixedPool]);
        const offset = this.stableOffset(`${topic}:${difficulty}:${count}`, pool.length);
        return Array.from({ length: Math.min(count, pool.length) }, (_, index) => {
            const item = pool[(offset + index) % pool.length];
            return { ...item, difficulty };
        });
    }
    byDifficulty(pool, difficulty) {
        if (difficulty === client_1.SkillLevel.BEGINNER) {
            return pool.filter((question) => question.difficulty === client_1.SkillLevel.BEGINNER);
        }
        if (difficulty === client_1.SkillLevel.INTERMEDIATE) {
            return pool.filter((question) => question.difficulty !== client_1.SkillLevel.ADVANCED);
        }
        return pool;
    }
    unique(pool) {
        const seen = new Set();
        return pool.filter((question) => {
            if (seen.has(question.id))
                return false;
            seen.add(question.id);
            return true;
        });
    }
    normalizeTopic(topic = 'mixed') {
        const normalized = topic.toLowerCase().trim().replace(/[_-]/g, ' ');
        if (!normalized || normalized === 'mixed')
            return 'mixed';
        if (normalized.includes('prep') || normalized.includes('介'))
            return 'prepositions';
        if (normalized.includes('tense') || normalized.includes('時態'))
            return 'tense';
        if (normalized.includes('conjunction') || normalized.includes('連接'))
            return 'conjunctions';
        if (normalized.includes('form') || normalized.includes('字形'))
            return 'word forms';
        if (normalized.includes('condition') || normalized.includes('條件'))
            return 'conditionals';
        if (normalized.includes('passive') || normalized.includes('被動'))
            return 'passive voice';
        if (normalized.includes('adverb') || normalized.includes('副詞') || normalized.includes('形容'))
            return 'adjective adverb';
        if (normalized.includes('agreement') || normalized.includes('主謂'))
            return 'subject verb agreement';
        if (normalized.includes('vocab') || normalized.includes('單字') || normalized.includes('語彙'))
            return 'vocabulary';
        return question_bank_1.QUESTION_TOPICS.includes(normalized) ? normalized : 'mixed';
    }
    normalizeDifficulty(difficulty = 'BEGINNER') {
        const value = difficulty.toUpperCase();
        if (value === client_1.SkillLevel.INTERMEDIATE)
            return client_1.SkillLevel.INTERMEDIATE;
        if (value === client_1.SkillLevel.ADVANCED)
            return client_1.SkillLevel.ADVANCED;
        return client_1.SkillLevel.BEGINNER;
    }
    stableOffset(seed, length) {
        if (!length)
            return 0;
        return [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length;
    }
};
exports.QuestionGeneratorService = QuestionGeneratorService;
exports.QuestionGeneratorService = QuestionGeneratorService = __decorate([
    (0, common_1.Injectable)()
], QuestionGeneratorService);
//# sourceMappingURL=question-generator.service.js.map