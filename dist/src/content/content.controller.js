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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const content_service_1 = require("./content.service");
let ContentController = class ContentController {
    constructor(content) {
        this.content = content;
    }
    lessons(query) {
        return this.content.lessons(query);
    }
    lesson(id) {
        return this.content.lesson(id);
    }
    generate(body) {
        return this.content.generateQuestions(body);
    }
    vocabulary(query) {
        return this.content.vocabulary(query);
    }
    review(user) {
        return this.content.review(user.id);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)('lessons'),
    (0, swagger_1.ApiOperation)({ summary: 'List deterministic TOEIC lessons' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "lessons", null);
__decorate([
    (0, common_1.Get)('lessons/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get one deterministic TOEIC lesson' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "lesson", null);
__decorate([
    (0, common_1.Post)('questions/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate TOEIC Part 5 questions with rule-based templates' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('vocabulary'),
    (0, swagger_1.ApiOperation)({ summary: 'List local TOEIC vocabulary' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "vocabulary", null);
__decorate([
    (0, common_1.Get)('review'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOperation)({ summary: 'Return deterministic review guidance from completed attempts' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "review", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('Offline Content'),
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
//# sourceMappingURL=content.controller.js.map