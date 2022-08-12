import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum } from 'class-validator';
import { AccessAction } from '../enums/activationAction.enum';

export class AccessRequest {
  @IsEmail()
  email: string;

  @IsEnum(AccessAction)
  action: AccessAction;

  @Type(() => Date)
  expiredAt: Date;
}

export const Access = createParamDecorator((data, ctx: ExecutionContext) => {
  const { access } = ctx.switchToHttp().getRequest();
  return access;
});
