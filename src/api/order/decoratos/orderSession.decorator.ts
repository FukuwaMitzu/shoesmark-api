import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class OrderSessionRequest {
  @Expose()
  orderId: string;
  @Expose()
  @Type(() => Date)
  expiredAt: Date;
}

export const OrderSession = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const { orderSession } = ctx.switchToHttp().getRequest();
    return orderSession;
  },
);
