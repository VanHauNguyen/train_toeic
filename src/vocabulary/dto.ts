import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CefrLevel, ContentSource, SkillLevel } from '@prisma/client';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateVocabularyDto {
  @ApiProperty({ example: 'procurement' })
  @IsString()
  word: string;

  @ApiPropertyOptional({ example: '採購' })
  @IsOptional()
  @IsString()
  meaningZhTW?: string;

  @ApiPropertyOptional({ example: 'mua sắm' })
  @IsOptional()
  @IsString()
  meaningVi?: string;

  @ApiPropertyOptional({ example: '採購', deprecated: true, description: 'Backward-compatible alias for meaningZhTW.' })
  @IsOptional()
  @IsString()
  meaningZhTw?: string;

  @ApiPropertyOptional({ example: 'n.' })
  @IsOptional()
  @IsString()
  partOfSpeech?: string;

  @ApiPropertyOptional({ example: 'The procurement team reviewed the contract.' })
  @IsOptional()
  @IsString()
  example?: string;

  @ApiPropertyOptional({ example: '採購團隊審查了合約。' })
  @IsOptional()
  @IsString()
  exampleZhTW?: string;

  @ApiPropertyOptional({ example: 'Đội mua sắm đã xem xét hợp đồng.' })
  @IsOptional()
  @IsString()
  exampleVi?: string;

  @ApiPropertyOptional({ example: '採購團隊審查了合約。', deprecated: true, description: 'Backward-compatible alias for exampleZhTW.' })
  @IsOptional()
  @IsString()
  exampleZhTw?: string;

  @ApiPropertyOptional({ type: [String], example: ['toeic', 'business'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: 'business' })
  @IsOptional()
  @IsString()
  toeicCategory?: string;

  @ApiPropertyOptional({ enum: CefrLevel, example: CefrLevel.B1 })
  @IsOptional()
  @IsEnum(CefrLevel)
  cefrLevel?: CefrLevel;

  @ApiPropertyOptional({ minimum: 0, maximum: 100, example: 85 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  frequencyScore?: number;

  @ApiPropertyOptional({ type: [String], example: ['buy', 'acquire'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  synonyms?: string[];

  @ApiPropertyOptional({ type: [String], example: ['sell'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  antonyms?: string[];

  @ApiPropertyOptional({ type: [String], example: ['purchase order', 'make a purchase'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  collocations?: string[];

  @ApiPropertyOptional({ enum: ContentSource, example: ContentSource.MANUAL })
  @IsOptional()
  @IsEnum(ContentSource)
  source?: ContentSource;

  @ApiPropertyOptional({ example: 'cambridge-list-001' })
  @IsOptional()
  @IsString()
  sourceRef?: string;

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(SkillLevel)
  level?: SkillLevel;
}

export class UpdateVocabularyDto extends CreateVocabularyDto {}
