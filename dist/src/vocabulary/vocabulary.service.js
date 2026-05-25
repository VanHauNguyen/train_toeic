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
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let VocabularyService = class VocabularyService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query = {}) {
        const page = Math.max(Number(query.page ?? 1), 1);
        const pageSize = Math.min(Math.max(Number(query.pageSize ?? 100), 1), 200);
        const where = {};
        if (query.search) {
            where.OR = [
                { word: { contains: query.search, mode: 'insensitive' } },
                { meaningZhTW: { contains: query.search, mode: 'insensitive' } },
                { meaningVi: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        if (query.tag)
            where.tags = { has: query.tag };
        if (query.category)
            where.toeicCategory = query.category;
        if (query.level && Object.values(client_1.SkillLevel).includes(query.level))
            where.level = query.level;
        if (query.cefrLevel && Object.values(client_1.CefrLevel).includes(query.cefrLevel))
            where.cefrLevel = query.cefrLevel;
        const [items, total] = await Promise.all([
            this.prisma.vocabulary.findMany({
                where,
                orderBy: [{ frequencyScore: 'desc' }, { word: 'asc' }],
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            this.prisma.vocabulary.count({ where }),
        ]);
        const data = items.map(this.withLegacyAliases);
        return query.page || query.pageSize || query.search || query.tag || query.category || query.level || query.cefrLevel
            ? { data, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } }
            : data;
    }
    async findOne(id) {
        const item = await this.prisma.vocabulary.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException('Vocabulary not found');
        return this.withLegacyAliases(item);
    }
    create(dto) {
        return this.prisma.vocabulary.create({ data: this.toData(dto) }).then(this.withLegacyAliases);
    }
    update(id, dto) {
        return this.prisma.vocabulary.update({ where: { id }, data: this.toData(dto) }).then(this.withLegacyAliases);
    }
    remove(id) {
        return this.prisma.vocabulary.delete({ where: { id } });
    }
    toData(dto) {
        const { meaningZhTw, exampleZhTw, ...data } = dto;
        const meaningZhTW = data.meaningZhTW ?? meaningZhTw;
        if (!meaningZhTW)
            throw new common_1.BadRequestException('meaningZhTW is required');
        return {
            ...data,
            meaningZhTW,
            exampleZhTW: data.exampleZhTW ?? exampleZhTw,
        };
    }
    withLegacyAliases(item) {
        return { ...item, meaningZhTw: item.meaningZhTW, exampleZhTw: item.exampleZhTW };
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map