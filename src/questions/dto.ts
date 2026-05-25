import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApprovalStatus, ContentSource, QuestionType, SkillLevel, ToeicPart } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionOptionDto {
  @ApiProperty({ example: 'A' })
  @IsString()
  label: string;

  @ApiProperty({ example: 'by' })
  @IsString()
  text: string;

  @ApiPropertyOptional({ example: '在...之前' })
  @IsOptional()
  @IsString()
  textZhTW?: string;

  @ApiPropertyOptional({ example: 'truoc han' })
  @IsOptional()
  @IsString()
  textVi?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionType, example: QuestionType.GRAMMAR })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({ enum: ToeicPart, example: ToeicPart.PART5 })
  @IsEnum(ToeicPart)
  toeicPart: ToeicPart;

  @ApiProperty({ example: 'The report must be submitted _____ Friday.' })
  @IsString()
  prompt: string;

  @ApiPropertyOptional({ example: '報告必須在星期五前提交。' })
  @IsOptional()
  @IsString()
  questionTextZhTW?: string;

  @ApiPropertyOptional({ example: 'Bao cao phai duoc nop truoc thu Sau.' })
  @IsOptional()
  @IsString()
  questionTextVi?: string;

  @ApiPropertyOptional({ example: 'Questions 1-3 refer to the following notice.' })
  @IsOptional()
  @IsString()
  passage?: string;

  @ApiPropertyOptional({ example: '第 1-3 題請參考以下公告。' })
  @IsOptional()
  @IsString()
  passageZhTW?: string;

  @ApiPropertyOptional({ example: 'Cau 1-3 dua tren thong bao sau.' })
  @IsOptional()
  @IsString()
  passageVi?: string;

  @ApiPropertyOptional({ example: 'by is used to express a deadline.' })
  @IsOptional()
  @IsString()
  explanation?: string;

  @ApiPropertyOptional({ example: 'by 用來表示截止時間。' })
  @IsOptional()
  @IsString()
  explanationZhTW?: string;

  @ApiPropertyOptional({ example: 'by duoc dung de dien ta han chot.' })
  @IsOptional()
  @IsString()
  explanationVi?: string;

  @ApiPropertyOptional({ enum: SkillLevel, example: SkillLevel.BEGINNER })
  @IsOptional()
  @IsEnum(SkillLevel)
  difficulty?: SkillLevel;

  @ApiPropertyOptional({ type: [String], example: ['deadline', 'preposition'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ enum: ContentSource, example: ContentSource.MANUAL })
  @IsOptional()
  @IsEnum(ContentSource)
  source?: ContentSource;

  @ApiPropertyOptional({ enum: ApprovalStatus, example: ApprovalStatus.APPROVED })
  @IsOptional()
  @IsEnum(ApprovalStatus)
  approvalStatus?: ApprovalStatus;

  @ApiPropertyOptional({ example: 'official-book-01-p5-001' })
  @IsOptional()
  @IsString()
  sourceRef?: string;

  @ApiPropertyOptional({ example: 'part5:the-report-must-be-submitted-friday' })
  @IsOptional()
  @IsString()
  duplicateKey?: string;

  @ApiPropertyOptional({ example: 'clxyz-audio-id' })
  @IsOptional()
  @IsString()
  audioFileId?: string;

  @ApiProperty({ type: [QuestionOptionDto] })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options: QuestionOptionDto[];
}

export class UpdateQuestionDto extends CreateQuestionDto {}
