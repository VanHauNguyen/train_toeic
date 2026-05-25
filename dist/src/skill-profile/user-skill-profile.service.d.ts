import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserSkillProfileDto } from './dto';
export declare class UserSkillProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    me(userId: string): import(".prisma/client").Prisma.Prisma__UserSkillProfileClient<{
        id: string;
        updatedAt: Date;
        estimatedLevel: import(".prisma/client").$Enums.SkillLevel;
        weakParts: import(".prisma/client").$Enums.ToeicPart[];
        strongParts: import(".prisma/client").$Enums.ToeicPart[];
        vocabularyLevel: import(".prisma/client").$Enums.SkillLevel;
        grammarLevel: import(".prisma/client").$Enums.SkillLevel;
        listeningLevel: import(".prisma/client").$Enums.SkillLevel;
        readingLevel: import(".prisma/client").$Enums.SkillLevel;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(userId: string, dto: UpdateUserSkillProfileDto): import(".prisma/client").Prisma.Prisma__UserSkillProfileClient<{
        id: string;
        updatedAt: Date;
        estimatedLevel: import(".prisma/client").$Enums.SkillLevel;
        weakParts: import(".prisma/client").$Enums.ToeicPart[];
        strongParts: import(".prisma/client").$Enums.ToeicPart[];
        vocabularyLevel: import(".prisma/client").$Enums.SkillLevel;
        grammarLevel: import(".prisma/client").$Enums.SkillLevel;
        listeningLevel: import(".prisma/client").$Enums.SkillLevel;
        readingLevel: import(".prisma/client").$Enums.SkillLevel;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
