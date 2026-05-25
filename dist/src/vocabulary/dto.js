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
exports.UpdateVocabularyDto = exports.CreateVocabularyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateVocabularyDto {
}
exports.CreateVocabularyDto = CreateVocabularyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'procurement' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "word", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '採購' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "meaningZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'mua sắm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "meaningVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '採購', deprecated: true, description: 'Backward-compatible alias for meaningZhTW.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "meaningZhTw", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'n.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "partOfSpeech", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'The procurement team reviewed the contract.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "example", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '採購團隊審查了合約。' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "exampleZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Đội mua sắm đã xem xét hợp đồng.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "exampleVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '採購團隊審查了合約。', deprecated: true, description: 'Backward-compatible alias for exampleZhTW.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "exampleZhTw", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['toeic', 'business'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'business' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "toeicCategory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.CefrLevel, example: client_1.CefrLevel.B1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.CefrLevel),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "cefrLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 0, maximum: 100, example: 85 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateVocabularyDto.prototype, "frequencyScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['buy', 'acquire'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "synonyms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['sell'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "antonyms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['purchase order', 'make a purchase'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateVocabularyDto.prototype, "collocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ContentSource, example: client_1.ContentSource.MANUAL }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ContentSource),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'cambridge-list-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "sourceRef", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.SkillLevel, example: client_1.SkillLevel.INTERMEDIATE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SkillLevel),
    __metadata("design:type", String)
], CreateVocabularyDto.prototype, "level", void 0);
class UpdateVocabularyDto extends CreateVocabularyDto {
}
exports.UpdateVocabularyDto = UpdateVocabularyDto;
//# sourceMappingURL=dto.js.map