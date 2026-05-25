import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserPreferencesDto } from './dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    me(userId: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
        createdAt: Date;
        skillProfile: {
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
        } | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    updateMe(userId: string, dto: UpdateUserPreferencesDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
        createdAt: Date;
        skillProfile: {
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
        } | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
        createdAt: Date;
    }[]>;
}
