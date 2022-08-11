import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { plainToInstance } from 'class-transformer';
import { isDefined } from 'class-validator';
import { AES, enc } from 'crypto-js';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { Env } from 'src/shared/enums/Env.enum';
import { OrderSessionRequest } from '../decoratos/orderSession.decorator';

export const OrderSessionGuardMetaKey = 'orderSession';
export const OrderSessionGuardHeaderKey = 'order-session';
@Injectable()
export class OrderSessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const action = this.reflector.get<boolean>(
      OrderSessionGuardMetaKey,
      context.getHandler(),
    );
    if (!isDefined(action)) return true;
    const req = context.switchToHttp().getRequest<Request>();
    const orderSession = req.headers[OrderSessionGuardHeaderKey];
    if (!isDefined(orderSession)) return false;
    const data = JSON.parse(
      AES.decrypt(orderSession, Env.MESSAGE_ENCRYPTION_KEY).toString(enc.Utf8),
    );
    try {
      const orderSessionRequest = plainToInstance(OrderSessionRequest, data);
      if (dayjs(orderSessionRequest.expiredAt).isBefore(dayjs())) return false;
      Object.assign(req, { orderSession: orderSessionRequest });
    } catch {
      throw new BadRequestException('Invalid order session code');
    }
    return true;
  }
}
