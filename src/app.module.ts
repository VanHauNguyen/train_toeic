import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { QuestionsModule } from './questions/questions.module';
import { TestsModule } from './tests/tests.module';
import { UserSkillProfileModule } from './skill-profile/user-skill-profile.module';
import { ContentImportModule } from './content-import/content-import.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    VocabularyModule,
    QuestionsModule,
    TestsModule,
    DashboardModule,
    ContentModule,
    UserSkillProfileModule,
    ContentImportModule,
  ],
})
export class AppModule {}
