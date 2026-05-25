import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { UpdateUserSkillProfileDto } from './dto';
import { UserSkillProfileService } from './user-skill-profile.service';
export declare class UserSkillProfileController {
    private readonly profile;
    constructor(profile: UserSkillProfileService);
    me(user: CurrentUserPayload): import(".prisma/client").Prisma.Prisma__UserSkillProfileClient<{
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
    update(user: CurrentUserPayload, dto: UpdateUserSkillProfileDto): import(".prisma/client").Prisma.Prisma__UserSkillProfileClient<{
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
