import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { UpdateUserPreferencesDto } from './dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    me(user: CurrentUserPayload): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    updateMe(user: CurrentUserPayload, dto: UpdateUserPreferencesDto): import(".prisma/client").Prisma.Prisma__UserClient<{
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
