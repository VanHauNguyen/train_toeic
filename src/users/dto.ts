import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserLanguage } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserPreferencesDto {
  @ApiPropertyOptional({ enum: UserLanguage, example: UserLanguage.VI })
  @IsOptional()
  @IsEnum(UserLanguage)
  preferredLanguage?: UserLanguage;
}
