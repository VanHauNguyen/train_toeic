import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ContentImportService } from './content-import.service';
import { ImportQuestionJsonDto, ImportVocabularyCsvDto } from './dto';

@ApiTags('Content Import')
@ApiBearerAuth('JWT-auth')
@Controller('content/import')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentImportController {
  constructor(private readonly imports: ContentImportService) {}

  @Post('vocabulary/csv')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Bulk import vocabulary from CSV (admin only)' })
  importVocabularyCsv(@Body() dto: ImportVocabularyCsvDto) {
    return this.imports.importVocabularyCsv(dto);
  }

  @Post('questions/json')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Bulk import TOEIC questions from JSON (admin only)' })
  importQuestionJson(@Body() dto: ImportQuestionJsonDto) {
    return this.imports.importQuestionJson(dto);
  }
}
