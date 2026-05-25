import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class ImportVocabularyCsvDto {
  @ApiProperty({
    description:
      'CSV with headers: word,meaningZhTW,meaningVi,partOfSpeech,example,exampleZhTW,exampleVi,tags,toeicCategory,cefrLevel,frequencyScore,synonyms,antonyms,collocations',
  })
  @IsString()
  csv: string;

  @ApiPropertyOptional({ example: 'internal-vocab-upload-2026-05' })
  @IsOptional()
  @IsString()
  sourceRef?: string;
}

export class ImportQuestionJsonDto {
  @ApiProperty({
    description:
      'Array of question objects with prompt, toeicPart, type, explanationZhTW, explanationVi, options, correctAnswer, tags.',
    type: Array,
  })
  @IsArray()
  questions: Record<string, unknown>[];

  @ApiPropertyOptional({ example: 'official-practice-json-001' })
  @IsOptional()
  @IsString()
  sourceRef?: string;

  @ApiPropertyOptional({ example: false, description: 'When true, imported questions are immediately approved.' })
  @IsOptional()
  @IsBoolean()
  approve?: boolean;
}
