import { ApiPropertyOptional } from '@nestjs/swagger';
import { SkillLevel, ToeicPart } from '@prisma/client';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserSkillProfileDto {
  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(SkillLevel)
  estimatedLevel?: SkillLevel;

  @ApiPropertyOptional({ enum: ToeicPart, isArray: true, example: [ToeicPart.PART5, ToeicPart.PART7] })
  @IsOptional()
  @IsArray()
  @IsEnum(ToeicPart, { each: true })
  weakParts?: ToeicPart[];

  @ApiPropertyOptional({ enum: ToeicPart, isArray: true, example: [ToeicPart.PART2] })
  @IsOptional()
  @IsArray()
  @IsEnum(ToeicPart, { each: true })
  strongParts?: ToeicPart[];

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(SkillLevel)
  vocabularyLevel?: SkillLevel;

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.BEGINNER })
  @IsOptional()
  @IsEnum(SkillLevel)
  grammarLevel?: SkillLevel;

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.INTERMEDIATE })
  @IsOptional()
  @IsEnum(SkillLevel)
  listeningLevel?: SkillLevel;

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.BEGINNER })
  @IsOptional()
  @IsEnum(SkillLevel)
  readingLevel?: SkillLevel;
}
