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
exports.UpdateQuestionDto = exports.CreateQuestionDto = exports.QuestionOptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class QuestionOptionDto {
}
exports.QuestionOptionDto = QuestionOptionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionOptionDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'by' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionOptionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '在...之前' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionOptionDto.prototype, "textZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'truoc han' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionOptionDto.prototype, "textVi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QuestionOptionDto.prototype, "isCorrect", void 0);
class CreateQuestionDto {
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.QuestionType, example: client_1.QuestionType.GRAMMAR }),
    (0, class_validator_1.IsEnum)(client_1.QuestionType),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.ToeicPart, example: client_1.ToeicPart.PART5 }),
    (0, class_validator_1.IsEnum)(client_1.ToeicPart),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "toeicPart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'The report must be submitted _____ Friday.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '報告必須在星期五前提交。' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionTextZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Bao cao phai duoc nop truoc thu Sau.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "questionTextVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Questions 1-3 refer to the following notice.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "passage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '第 1-3 題請參考以下公告。' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "passageZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Cau 1-3 dua tren thong bao sau.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "passageVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'by is used to express a deadline.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'by 用來表示截止時間。' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanationZhTW", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'by duoc dung de dien ta han chot.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "explanationVi", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.SkillLevel, example: client_1.SkillLevel.BEGINNER }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.SkillLevel),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['deadline', 'preposition'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ContentSource, example: client_1.ContentSource.MANUAL }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ContentSource),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.ApprovalStatus, example: client_1.ApprovalStatus.APPROVED }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.ApprovalStatus),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "approvalStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'official-book-01-p5-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "sourceRef", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'part5:the-report-must-be-submitted-friday' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "duplicateKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'clxyz-audio-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "audioFileId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [QuestionOptionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionOptionDto),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
class UpdateQuestionDto extends CreateQuestionDto {
}
exports.UpdateQuestionDto = UpdateQuestionDto;
//# sourceMappingURL=dto.js.map