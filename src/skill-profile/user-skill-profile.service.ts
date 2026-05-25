import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserSkillProfileDto } from './dto';

@Injectable()
export class UserSkillProfileService {
  constructor(private readonly prisma: PrismaService) {}

  me(userId: string) {
    return this.prisma.userSkillProfile.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  update(userId: string, dto: UpdateUserSkillProfileDto) {
    return this.prisma.userSkillProfile.upsert({
      where: { userId },
      create: { userId, ...dto },
      update: dto,
    });
  }
}
