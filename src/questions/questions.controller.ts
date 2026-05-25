import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionsService } from './questions.service';

@ApiTags('Questions')
@ApiBearerAuth('JWT-auth')
@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionsController {
  constructor(private readonly questions: QuestionsService) {}

  @Get()
  @ApiOperation({ summary: 'List TOEIC questions with options' })
  findAll(@Query() query: Record<string, string | undefined>) {
    return this.questions.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one TOEIC question with options' })
  findOne(@Param('id') id: string) {
    return this.questions.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a TOEIC question with options (admin only)' })
  create(@Body() dto: CreateQuestionDto) {
    return this.questions.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a TOEIC question and replace options (admin only)' })
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questions.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a TOEIC question (admin only)' })
  remove(@Param('id') id: string) {
    return this.questions.remove(id);
  }
}
