import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateUserSkillProfileDto } from './dto';
import { UserSkillProfileService } from './user-skill-profile.service';

@ApiTags('Skill Profile')
@ApiBearerAuth('JWT-auth')
@Controller('skill-profile')
@UseGuards(JwtAuthGuard)
export class UserSkillProfileController {
  constructor(private readonly profile: UserSkillProfileService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user skill profile' })
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.profile.me(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user skill profile' })
  update(@CurrentUser() user: CurrentUserPayload, @Body() dto: UpdateUserSkillProfileDto) {
    return this.profile.update(user.id, dto);
  }
}
