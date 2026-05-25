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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionsService = class QuestionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(query = {}) {
        const page = Math.max(Number(query.page ?? 1), 1);
        const pageSize = Math.min(Math.max(Number(query.pageSize ?? 100), 1), 200);
        const where = {};
        if (query.search) {
            where.OR = [
                { prompt: { contains: query.search, mode: 'insensitive' } },
                { passage: { contains: query.search, mode: 'insensitive' } },
                { explanation: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.tag)
            where.tags = { has: query.tag };
        if (query.toeicPart && Object.values(client_1.ToeicPart).includes(query.toeicPart))
            where.toeicPart = query.toeicPart;
        if (query.difficulty && Object.values(client_1.SkillLevel).includes(query.difficulty))
            where.difficulty = query.difficulty;
        if (query.approvalStatus && Object.values(client_1.ApprovalStatus).includes(query.approvalStatus)) {
            where.approvalStatus = query.approvalStatus;
        }
        const queryOptions = {
            where,
            include: { options: { orderBy: { label: 'asc' } } },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize,
        };
        if (query.page || query.pageSize || query.search || query.tag || query.toeicPart || query.difficulty || query.approvalStatus) {
            return Promise.all([
                this.prisma.question.findMany(queryOptions),
                this.prisma.question.count({ where }),
            ]).then(([data, total]) => ({ data, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } }));
        }
        return this.prisma.question.findMany({ include: { options: true }, orderBy: { createdAt: 'desc' } });
    }
    async findOne(id) {
        const question = await this.prisma.question.findUnique({ where: { id }, include: { options: true } });
        if (!question)
            throw new common_1.NotFoundException('Question not found');
        return question;
    }
    create(dto) {
        this.validateOptions(dto.options);
        const { options, ...data } = dto;
        return this.prisma.question.create({
            data: { ...data, duplicateKey: data.duplicateKey ?? this.duplicateKey(data.prompt), options: { create: options } },
            include: { options: true },
        });
    }
    async update(id, dto) {
        this.validateOptions(dto.options);
        const { options, ...data } = dto;
        await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            await tx.questionOption.deleteMany({ where: { questionId: id } });
            return tx.question.update({
                where: { id },
                data: { ...data, duplicateKey: data.duplicateKey ?? this.duplicateKey(data.prompt), options: { create: options } },
                include: { options: true },
            });
        });
    }
    remove(id) {
        return this.prisma.question.delete({ where: { id } });
    }
    validateOptions(options) {
        if (options.filter((option) => option.isCorrect).length !== 1) {
            throw new common_1.BadRequestException('A question must have exactly one correct option');
        }
    }
    duplicateKey(prompt) {
        return prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 180);
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map