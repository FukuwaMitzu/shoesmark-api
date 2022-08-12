import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { isDefined } from 'class-validator';
import { AES } from 'crypto-js';
import * as dayjs from 'dayjs';
import { Env } from 'src/shared/enums/Env.enum';
import { ICRUDService } from 'src/shared/interfaces/ICRUDService.interface';
import { IFindAllOptions } from 'src/shared/interfaces/IFindAllOptions.interface';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { OrderSessionRequest } from './decoratos/orderSession.decorator';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/orderStatus.enum';

export class OrderSortBy {
  dateCreated?: 'ASC' | 'DESC';
  totalPrice?: 'ASC' | 'DESC';
  datePurchased?: 'ASC' | 'DESC';
  status?: 'ASC' | 'DESC';
  gender?: 'ASC' | 'DESC';
}

class OrderFindAllOptions implements IFindAllOptions {
  limit: number;
  offset: number;
  ids: string[];
  ownerIds?: string[];
  sortBy: OrderSortBy;
}

@Injectable()
export class OrderService implements ICRUDService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { orderId: id },
      relations: {
        owner: true,
        details: {
          shoes: true,
        },
      },
    });
  }

  getPreBuiltFindAllQuery(
    options: OrderFindAllOptions,
  ): SelectQueryBuilder<Order> {
    const queryBD = this.orderRepository.createQueryBuilder('order');
    queryBD
      .leftJoinAndSelect('order.owner', 'owner')
      .leftJoinAndSelect('order.details', 'details')
      .leftJoinAndSelect('details.shoes', 'shoes')
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select()
            .from(Order, 'suborder')
            .leftJoin('suborder.details', 'subdetails')
            .addSelect('suborder.orderId', 'suborderOrderId')
            .addSelect(
              'COALESCE(SUM(subdetails.quantity * subdetails.price *(100-subdetails.sale)/100), 0)',
              'total_price',
            )
            .groupBy('suborder.orderId'),
        'total',
        '"suborderOrderId"=order.orderId',
      );
    if (isDefined(options.sortBy)) {
      if (isDefined(options.sortBy.dateCreated))
        queryBD.addOrderBy(
          'order.createdAt',
          options.sortBy.dateCreated,
          options.sortBy.dateCreated == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
        );
      if (isDefined(options.sortBy.totalPrice))
        queryBD.addOrderBy(
          'total_price',
          options.sortBy.totalPrice,
          options.sortBy.totalPrice == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
        );
      if (isDefined(options.sortBy.datePurchased))
        queryBD.addOrderBy(
          'order.datePurchased',
          options.sortBy.datePurchased,
          options.sortBy.datePurchased == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
        );
      if (isDefined(options.sortBy.status))
        queryBD.addOrderBy(
          'order.status',
          options.sortBy.status,
          options.sortBy.status == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
        );
      if (isDefined(options.sortBy.gender))
        queryBD.addOrderBy(
          'order.orderGender',
          options.sortBy.gender,
          options.sortBy.gender == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST',
        );
    }
    if (options?.ownerIds.length > 0)
      queryBD.andWhere('order.owner.userId IN (:...ownerIds)', {
        ownerIds: options.ownerIds,
      });
    if (options.ids.length > 0)
      queryBD.where('order.orderId IN (:...ids)', { ids: options.ids });
    return queryBD;
  }

  async findAll(options: OrderFindAllOptions): Promise<[Order[], number]> {
    return await this.getPreBuiltFindAllQuery(options).getManyAndCount();
  }
  async update(value: Order): Promise<Order> {
    await this.orderRepository.save(value);
    return value;
  }
  async deleteById(id: string): Promise<void> {
    await this.orderRepository.delete({ orderId: id });
  }
  getRepository(): Repository<Order> {
    return this.orderRepository;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.findById(id);
    order.status = status;
    await this.update(order);
    return order;
  }

  async createOrderSessionToken(orderId: string) {
    const orderSession = new OrderSessionRequest();
    orderSession.orderId = orderId;
    orderSession.expiredAt = dayjs().add(1, 'day').toDate();
    return AES.encrypt(
      JSON.stringify(instanceToPlain(orderSession)),
      Env.MESSAGE_ENCRYPTION_KEY,
    ).toString();
  }
}
