import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user learning dashboard metrics' })
  me(@CurrentUser() user: CurrentUserPayload) {
    return this.dashboard.me(user.id);
  }

  @Get('admin/analytics')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get admin content and question-bank analytics' })
  adminAnalytics() {
    return this.dashboard.adminAnalytics();
  }
}
