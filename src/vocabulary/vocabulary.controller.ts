import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateVocabularyDto, UpdateVocabularyDto } from './dto';
import { VocabularyService } from './vocabulary.service';

@ApiTags('Vocabulary')
@ApiBearerAuth('JWT-auth')
@Controller('vocabulary')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VocabularyController {
  constructor(private readonly vocabulary: VocabularyService) {}

  @Get()
  @ApiOperation({ summary: 'List TOEIC vocabulary items' })
  findAll(@Query() query: Record<string, string | undefined>) {
    return this.vocabulary.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one vocabulary item' })
  findOne(@Param('id') id: string) {
    return this.vocabulary.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a vocabulary item (admin only)' })
  create(@Body() dto: CreateVocabularyDto) {
    return this.vocabulary.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a vocabulary item (admin only)' })
  update(@Param('id') id: string, @Body() dto: UpdateVocabularyDto) {
    return this.vocabulary.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a vocabulary item (admin only)' })
  remove(@Param('id') id: string) {
    return this.vocabulary.remove(id);
  }
}
