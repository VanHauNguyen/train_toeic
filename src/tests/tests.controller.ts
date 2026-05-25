import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AddQuestionToTestDto, CreateTestDto, SubmitAttemptDto, UpdateTestDto } from './dto';
import { TestsService } from './tests.service';

@ApiTags('Tests')
@ApiBearerAuth('JWT-auth')
@Controller('tests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TestsController {
  constructor(private readonly tests: TestsService) {}

  @Get()
  @ApiOperation({ summary: 'List tests with linked questions' })
  findAll() {
    return this.tests.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one test with ordered questions and options' })
  findOne(@Param('id') id: string) {
    return this.tests.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a test (admin only)' })
  create(@Body() dto: CreateTestDto) {
    return this.tests.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a test (admin only)' })
  update(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.tests.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a test (admin only)' })
  remove(@Param('id') id: string) {
    return this.tests.remove(id);
  }

  @Post(':id/questions')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Add a question to a test (admin only)' })
  addQuestion(@Param('id') id: string, @Body() dto: AddQuestionToTestDto) {
    return this.tests.addQuestion(id, dto);
  }

  @Post(':id/attempts')
  @ApiOperation({ summary: 'Start a test attempt for the authenticated user' })
  startAttempt(@Param('id') id: string, @CurrentUser() user: CurrentUserPayload) {
    return this.tests.startAttempt(id, user.id);
  }

  @Post('attempts/:attemptId/submit')
  @ApiOperation({ summary: 'Submit a test attempt and calculate score' })
  submitAttempt(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SubmitAttemptDto,
  ) {
    return this.tests.submitAttempt(attemptId, user.id, dto);
  }

  @Get('attempts/:attemptId/result')
  @ApiOperation({ summary: 'Get a completed attempt result' })
  result(@Param('attemptId') attemptId: string, @CurrentUser() user: CurrentUserPayload) {
    return this.tests.result(attemptId, user.id);
  }

  @Get('attempts/:attemptId/review')
  @ApiOperation({ summary: 'Review answers and explanations for a completed attempt' })
  review(@Param('attemptId') attemptId: string, @CurrentUser() user: CurrentUserPayload) {
    return this.tests.review(attemptId, user.id);
  }
}
