import { Module } from '@nestjs/common';
import { UserSkillProfileController } from './user-skill-profile.controller';
import { UserSkillProfileService } from './user-skill-profile.service';

@Module({
  controllers: [UserSkillProfileController],
  providers: [UserSkillProfileService],
})
export class UserSkillProfileModule {}
