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
exports.TestsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const dto_1 = require("./dto");
const tests_service_1 = require("./tests.service");
let TestsController = class TestsController {
    constructor(tests) {
        this.tests = tests;
    }
    findAll() {
        return this.tests.findAll();
    }
    findOne(id) {
        return this.tests.findOne(id);
    }
    create(dto) {
        return this.tests.create(dto);
    }
    update(id, dto) {
        return this.tests.update(id, dto);
    }
    remove(id) {
        return this.tests.remove(id);
    }
    addQuestion(id, dto) {
        return this.tests.addQuestion(id, dto);
    }
    startAttempt(id, user) {
        return this.tests.startAttempt(id, user.id);
    }
    submitAttempt(attemptId, user, dto) {
        return this.tests.submitAttempt(attemptId, user.id, dto);
    }
    result(attemptId, user) {
        return this.tests.result(attemptId, user.id);
    }
    review(attemptId, user) {
        return this.tests.review(attemptId, user.id);
    }
};
exports.TestsController = TestsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List tests with linked questions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get one test with ordered questions and options' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a test (admin only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateTestDto]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a test (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateTestDto]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a test (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/questions'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add a question to a test (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AddQuestionToTestDto]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Post)(':id/attempts'),
    (0, swagger_1.ApiOperation)({ summary: 'Start a test attempt for the authenticated user' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Post)('attempts/:attemptId/submit'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a test attempt and calculate score' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dto_1.SubmitAttemptDto]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "submitAttempt", null);
__decorate([
    (0, common_1.Get)('attempts/:attemptId/result'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a completed attempt result' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "result", null);
__decorate([
    (0, common_1.Get)('attempts/:attemptId/review'),
    (0, swagger_1.ApiOperation)({ summary: 'Review answers and explanations for a completed attempt' }),
    __param(0, (0, common_1.Param)('attemptId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TestsController.prototype, "review", null);
exports.TestsController = TestsController = __decorate([
    (0, swagger_1.ApiTags)('Tests'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('tests'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [tests_service_1.TestsService])
], TestsController);
//# sourceMappingURL=tests.controller.js.map