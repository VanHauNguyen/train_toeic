import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { QuestionGeneratorService } from './question-generator.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContentController],
  providers: [ContentService, QuestionGeneratorService],
  exports: [ContentService, QuestionGeneratorService],
})
export class ContentModule {}
