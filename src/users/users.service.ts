import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserPreferencesDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  me(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, preferredLanguage: true, createdAt: true, skillProfile: true },
    });
  }

  updateMe(userId: string, dto: UpdateUserPreferencesDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: { id: true, email: true, name: true, role: true, preferredLanguage: true, createdAt: true, skillProfile: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, preferredLanguage: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
