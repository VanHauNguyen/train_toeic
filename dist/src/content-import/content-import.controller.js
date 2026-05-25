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
exports.ContentImportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const content_import_service_1 = require("./content-import.service");
const dto_1 = require("./dto");
let ContentImportController = class ContentImportController {
    constructor(imports) {
        this.imports = imports;
    }
    importVocabularyCsv(dto) {
        return this.imports.importVocabularyCsv(dto);
    }
    importQuestionJson(dto) {
        return this.imports.importQuestionJson(dto);
    }
};
exports.ContentImportController = ContentImportController;
__decorate([
    (0, common_1.Post)('vocabulary/csv'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import vocabulary from CSV (admin only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ImportVocabularyCsvDto]),
    __metadata("design:returntype", void 0)
], ContentImportController.prototype, "importVocabularyCsv", null);
__decorate([
    (0, common_1.Post)('questions/json'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Bulk import TOEIC questions from JSON (admin only)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ImportQuestionJsonDto]),
    __metadata("design:returntype", void 0)
], ContentImportController.prototype, "importQuestionJson", null);
exports.ContentImportController = ContentImportController = __decorate([
    (0, swagger_1.ApiTags)('Content Import'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('content/import'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [content_import_service_1.ContentImportService])
], ContentImportController);
//# sourceMappingURL=content-import.controller.js.map