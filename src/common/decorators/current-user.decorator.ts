import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export type CurrentUserPayload = {
  id: string;
  email: string;
  role: string;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user?.id) throw new UnauthorizedException('Authenticated user is missing from request');
    return request.user;
  },
);
