import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            name: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            email: string;
            name: string | null;
            id: string;
            role: import(".prisma/client").$Enums.UserRole;
            preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
        };
        accessToken: string;
    }>;
    me(userId: string): Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    private sign;
    private safeUserSelect;
    private isUniqueConstraintError;
}
