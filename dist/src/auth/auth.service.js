"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (exists)
            throw new common_1.ConflictException('Email is already registered');
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    passwordHash: await bcrypt.hash(dto.password, 12),
                    skillProfile: { create: {} },
                },
                select: this.safeUserSelect(),
            });
            return { user, accessToken: this.sign(user) };
        }
        catch (error) {
            if (this.isUniqueConstraintError(error)) {
                throw new common_1.ConflictException('Email is already registered');
            }
            throw error;
        }
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const safeUser = await this.prisma.user.findUniqueOrThrow({
            where: { id: user.id },
            select: this.safeUserSelect(),
        });
        return { user: safeUser, accessToken: this.sign(safeUser) };
    }
    me(userId) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: this.safeUserSelect(),
        });
    }
    sign(user) {
        return this.jwt.sign({ sub: user.id, email: user.email, role: user.role });
    }
    safeUserSelect() {
        return { id: true, email: true, name: true, role: true, preferredLanguage: true };
    }
    isUniqueConstraintError(error) {
        return error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map