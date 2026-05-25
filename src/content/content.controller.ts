import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ContentService } from './content.service';

@ApiTags('Offline Content')
@Controller('api')
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get('lessons')
  @ApiOperation({ summary: 'List deterministic TOEIC lessons' })
  lessons(@Query() query: { part?: string; level?: string }) {
    return this.content.lessons(query);
  }

  @Get('lessons/:id')
  @ApiOperation({ summary: 'Get one deterministic TOEIC lesson' })
  lesson(@Param('id') id: string) {
    return this.content.lesson(id);
  }

  @Post('questions/generate')
  @ApiOperation({ summary: 'Generate TOEIC Part 5 questions with rule-based templates' })
  generate(@Body() body: { topic?: string; difficulty?: string; count?: number }) {
    return this.content.generateQuestions(body);
  }

  @Get('vocabulary')
  @ApiOperation({ summary: 'List local TOEIC vocabulary' })
  vocabulary(@Query() query: { tag?: string; category?: string; level?: string }) {
    return this.content.vocabulary(query);
  }

  @Get('review')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Return deterministic review guidance from completed attempts' })
  review(@CurrentUser() user: CurrentUserPayload) {
    return this.content.review(user.id);
  }
}
