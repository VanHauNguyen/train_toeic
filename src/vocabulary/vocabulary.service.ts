import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CefrLevel, Prisma, SkillLevel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto';

@Injectable()
export class VocabularyService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: Record<string, string | undefined> = {}) {
    const page = Math.max(Number(query.page ?? 1), 1);
    const pageSize = Math.min(Math.max(Number(query.pageSize ?? 100), 1), 200);
    const where: Prisma.VocabularyWhereInput = {};
    if (query.search) {
      where.OR = [
        { word: { contains: query.search, mode: 'insensitive' } },
        { meaningZhTW: { contains: query.search, mode: 'insensitive' } },
        { meaningVi: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.tag) where.tags = { has: query.tag };
    if (query.category) where.toeicCategory = query.category;
    if (query.level && Object.values(SkillLevel).includes(query.level as SkillLevel)) where.level = query.level as SkillLevel;
    if (query.cefrLevel && Object.values(CefrLevel).includes(query.cefrLevel as CefrLevel)) where.cefrLevel = query.cefrLevel as CefrLevel;

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

  async findOne(id: string) {
    const item = await this.prisma.vocabulary.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Vocabulary not found');
    return this.withLegacyAliases(item);
  }

  create(dto: CreateVocabularyDto) {
    return this.prisma.vocabulary.create({ data: this.toData(dto) }).then(this.withLegacyAliases);
  }

  update(id: string, dto: UpdateVocabularyDto) {
    return this.prisma.vocabulary.update({ where: { id }, data: this.toData(dto) }).then(this.withLegacyAliases);
  }

  remove(id: string) {
    return this.prisma.vocabulary.delete({ where: { id } });
  }

  private toData(dto: CreateVocabularyDto | UpdateVocabularyDto) {
    const { meaningZhTw, exampleZhTw, ...data } = dto;
    const meaningZhTW = data.meaningZhTW ?? meaningZhTw;
    if (!meaningZhTW) throw new BadRequestException('meaningZhTW is required');
    return {
      ...data,
      meaningZhTW,
      exampleZhTW: data.exampleZhTW ?? exampleZhTw,
    };
  }

  private withLegacyAliases(item: { meaningZhTW: string; exampleZhTW: string | null; [key: string]: unknown }) {
    return { ...item, meaningZhTw: item.meaningZhTW, exampleZhTw: item.exampleZhTW };
  }
}
