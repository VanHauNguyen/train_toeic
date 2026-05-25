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
exports.SubmitAttemptDto = exports.AnswerDto = exports.AddQuestionToTestDto = exports.UpdateTestDto = exports.CreateTestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateTestDto {
}
exports.CreateTestDto = CreateTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TOEIC Part 5 Practice' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Short grammar practice test' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTestDto.prototype, "isPublished", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTestDto.prototype, "timeLimitMin", void 0);
class UpdateTestDto extends CreateTestDto {
}
exports.UpdateTestDto = UpdateTestDto;
class AddQuestionToTestDto {
}
exports.AddQuestionToTestDto = AddQuestionToTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clxyz-question-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddQuestionToTestDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 1, example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddQuestionToTestDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minimum: 1, example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddQuestionToTestDto.prototype, "points", void 0);
class AnswerDto {
}
exports.AnswerDto = AnswerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clxyz-question-id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'clxyz-option-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnswerDto.prototype, "selectedOptionId", void 0);
class SubmitAttemptDto {
}
exports.SubmitAttemptDto = SubmitAttemptDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AnswerDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AnswerDto),
    __metadata("design:type", Array)
], SubmitAttemptDto.prototype, "answers", void 0);
//# sourceMappingURL=dto.js.map