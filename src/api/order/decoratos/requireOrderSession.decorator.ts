import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import {
  OrderSessionGuardHeaderKey,
  OrderSessionGuardMetaKey,
  OrderSessionGuard,
} from '../guards/orderSession.guard';

export function RequireOrderSession() {
  return applyDecorators(
    SetMetadata(OrderSessionGuardMetaKey, true),
    UseGuards(OrderSessionGuard),
    ApiHeader({ name: OrderSessionGuardHeaderKey }),
  );
}
