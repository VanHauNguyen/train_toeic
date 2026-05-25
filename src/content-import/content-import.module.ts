import { Module } from '@nestjs/common';
import { ContentImportController } from './content-import.controller';
import { ContentImportService } from './content-import.service';

@Module({
  controllers: [ContentImportController],
  providers: [ContentImportService],
})
export class ContentImportModule {}
