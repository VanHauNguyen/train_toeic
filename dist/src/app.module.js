"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const prisma_module_1 = require("./prisma/prisma.module");
const users_module_1 = require("./users/users.module");
const vocabulary_module_1 = require("./vocabulary/vocabulary.module");
const questions_module_1 = require("./questions/questions.module");
const tests_module_1 = require("./tests/tests.module");
const user_skill_profile_module_1 = require("./skill-profile/user-skill-profile.module");
const content_import_module_1 = require("./content-import/content-import.module");
const content_module_1 = require("./content/content.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            vocabulary_module_1.VocabularyModule,
            questions_module_1.QuestionsModule,
            tests_module_1.TestsModule,
            dashboard_module_1.DashboardModule,
            content_module_1.ContentModule,
            user_skill_profile_module_1.UserSkillProfileModule,
            content_import_module_1.ContentImportModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map