import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTestDto {
  @ApiProperty({ example: 'TOEIC Part 5 Practice' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Short grammar practice test' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiPropertyOptional({ minimum: 1, example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitMin?: number;
}

export class UpdateTestDto extends CreateTestDto {}

export class AddQuestionToTestDto {
  @ApiProperty({ example: 'clxyz-question-id' })
  @IsString()
  questionId: string;

  @ApiProperty({ minimum: 1, example: 1 })
  @IsInt()
  @Min(1)
  order: number;

  @ApiPropertyOptional({ minimum: 1, example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  points?: number;
}

export class AnswerDto {
  @ApiProperty({ example: 'clxyz-question-id' })
  @IsString()
  questionId: string;

  @ApiPropertyOptional({ example: 'clxyz-option-id' })
  @IsOptional()
  @IsString()
  selectedOptionId?: string;
}

export class SubmitAttemptDto {
  @ApiProperty({ type: [AnswerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
