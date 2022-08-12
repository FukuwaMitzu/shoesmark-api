import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Type } from 'class-transformer';

export class OrderSessionRequest {
  @Type(() => String)
  orderId: string;
  @Type(() => Date)
  expiredAt: Date;
}

export const OrderSession = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { orderSession } = ctx.switchToHttp().getRequest();
    return orderSession;
  },
);
