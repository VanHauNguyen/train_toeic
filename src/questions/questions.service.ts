import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApprovalStatus, Prisma, SkillLevel, ToeicPart } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: Record<string, string | undefined> = {}) {
    const page = Math.max(Number(query.page ?? 1), 1);
    const pageSize = Math.min(Math.max(Number(query.pageSize ?? 100), 1), 200);
    const where: Prisma.QuestionWhereInput = {};
    if (query.search) {
      where.OR = [
        { prompt: { contains: query.search, mode: 'insensitive' } },
        { passage: { contains: query.search, mode: 'insensitive' } },
        { explanation: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.tag) where.tags = { has: query.tag };
    if (query.toeicPart && Object.values(ToeicPart).includes(query.toeicPart as ToeicPart)) where.toeicPart = query.toeicPart as ToeicPart;
    if (query.difficulty && Object.values(SkillLevel).includes(query.difficulty as SkillLevel)) where.difficulty = query.difficulty as SkillLevel;
    if (query.approvalStatus && Object.values(ApprovalStatus).includes(query.approvalStatus as ApprovalStatus)) {
      where.approvalStatus = query.approvalStatus as ApprovalStatus;
    }
    const queryOptions = {
      where,
      include: { options: { orderBy: { label: 'asc' as const } } },
      orderBy: { createdAt: 'desc' as const },
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

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({ where: { id }, include: { options: true } });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  create(dto: CreateQuestionDto) {
    this.validateOptions(dto.options);
    const { options, ...data } = dto;
    return this.prisma.question.create({
      data: { ...data, duplicateKey: data.duplicateKey ?? this.duplicateKey(data.prompt), options: { create: options } },
      include: { options: true },
    });
  }

  async update(id: string, dto: UpdateQuestionDto) {
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

  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }

  private validateOptions(options: { isCorrect: boolean }[]) {
    if (options.filter((option) => option.isCorrect).length !== 1) {
      throw new BadRequestException('A question must have exactly one correct option');
    }
  }

  private duplicateKey(prompt: string) {
    return prompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 180);
  }
}
