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
exports.ImportQuestionJsonDto = exports.ImportVocabularyCsvDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ImportVocabularyCsvDto {
}
exports.ImportVocabularyCsvDto = ImportVocabularyCsvDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CSV with headers: word,meaningZhTW,meaningVi,partOfSpeech,example,exampleZhTW,exampleVi,tags,toeicCategory,cefrLevel,frequencyScore,synonyms,antonyms,collocations',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportVocabularyCsvDto.prototype, "csv", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'internal-vocab-upload-2026-05' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportVocabularyCsvDto.prototype, "sourceRef", void 0);
class ImportQuestionJsonDto {
}
exports.ImportQuestionJsonDto = ImportQuestionJsonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of question objects with prompt, toeicPart, type, explanationZhTW, explanationVi, options, correctAnswer, tags.',
        type: Array,
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ImportQuestionJsonDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'official-practice-json-001' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ImportQuestionJsonDto.prototype, "sourceRef", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'When true, imported questions are immediately approved.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ImportQuestionJsonDto.prototype, "approve", void 0);
//# sourceMappingURL=dto.js.map