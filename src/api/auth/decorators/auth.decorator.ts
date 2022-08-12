import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsBoolean, IsEnum, IsUUID } from 'class-validator';
import { Role } from '../enums/role.enum';

export class AuthRequest {
  @IsUUID()
  userId: string;

  @IsBoolean()
  isActive: boolean;

  @IsEnum(Role)
  role: Role;
}

export const Auth = createParamDecorator((data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  return user;
});
