import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
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
    me(user: CurrentUserPayload): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string | null;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
        preferredLanguage: import(".prisma/client").$Enums.UserLanguage;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
