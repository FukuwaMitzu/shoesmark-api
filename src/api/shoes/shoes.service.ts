import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICRUDService } from 'src/shared/interfaces/ICRUDService.interface';
import { IFindAllOptions } from 'src/shared/interfaces/IFindAllOptions.interface';
import { Brackets, In, Repository } from 'typeorm';
import { Shoes } from './entities/shoes.entity';

class ShoesFindAllOptions implements IFindAllOptions {
  limit: number;
  offset: number;
  ids: string[];
  shoesName?: string;
  categoryIds?: string[];
  colorId?: string;
  SKU?: string;
  price?: {
    from: number;
    to?: number;
  };
  size?: number;
}

@Injectable()
export class ShoesService implements ICRUDService<Shoes> {
  constructor(
    @InjectRepository(Shoes)
    private readonly shoesRepository: Repository<Shoes>,
  ) {}
  async findById(id: string): Promise<Shoes> {
    return await this.shoesRepository.findOne({
      where: { shoesId: id },
      relations: { brand: true, color: true, categories: true },
    });
  }
  async findAll(options: ShoesFindAllOptions): Promise<[Shoes[], number]> {
    const query = this.shoesRepository.createQueryBuilder('shoes');
    query
      .leftJoinAndSelect('shoes.brand', 'brand')
      .leftJoinAndSelect('shoes.color', 'color')
      .leftJoinAndSelect('shoes.categories', 'categories')
      .skip(options.offset)
      .take(options.limit);
    if (options.ids) query.andWhereInIds(options.ids);
    if (options.shoesName)
      query.andWhere('shoes.shoesName ILIKE :name', {
        name: `%${options.shoesName}%`,
      });
    if (options.categoryIds)
      query.andWhere('categories.categoryId IN (:...categoryIds)', {
        categoryIds: options.categoryIds,
      });
    if (options.colorId)
      query.andWhere('color.colorId = :colorId', { colorId: options.colorId });
    if (options.price) {
      query.andWhere('shoes.price >= :fromPrice', {
        fromPrice: options.price.from,
      });
      if (options.price.to)
        query.andWhere('shoes.price <= :toPrice', {
          toPrice: options.price.to,
        });
    }
    if (options.size)
      query.andWhere('shoes.size = :size', { size: options.size });
    if (options.SKU)
      query.andWhere('shoes.SKU ILIKE :SKU', { SKU: `%${options.SKU}%` });
    return await query.getManyAndCount();
  }
  async update(value: Shoes): Promise<Shoes> {
    await this.shoesRepository.save(value);
    return value;
  }
  async deleteById(id: string): Promise<void> {
    await this.shoesRepository.delete({ shoesId: id });
  }
  async deleteMany(ids: string[]): Promise<void> {
    await this.shoesRepository.delete({ shoesId: In(ids) });
  }
  getRepository(): Repository<Shoes> {
    return this.shoesRepository;
  }
  async addQuantity(id: string, quantity: number): Promise<void> {
    await this.shoesRepository.update(
      { shoesId: id },
      { quantity: () => `quantity + ${quantity}` },
    );
  }
  async related(
    id: string,
    limit: number,
    offset: number,
  ): Promise<[Shoes[], number]> {
    const shoes = await this.findById(id);
    const query = this.shoesRepository
      .createQueryBuilder('shoes')
      .leftJoinAndSelect('shoes.brand', 'brand')
      .leftJoinAndSelect('shoes.color', 'color')
      .leftJoinAndSelect('shoes.categories', 'categories');
    query.andWhere(
      new Brackets((qb) => {
        if (shoes.categories.length > 0)
          qb.where('categories.categoryId IN (:...categoryIds)', {
            categoryIds: shoes.categories.map(
              (category) => category.categoryId,
            ),
          });
        if (shoes.brand)
          qb.orWhere('brand.brandId  = :brandId', {
            brandId: shoes.brand.brandId,
          });
        return qb;
      }),
    );
    query.andWhere('shoes.shoesId <> :shoesId', { shoesId: id });
    query.skip(offset).take(limit);

    return await query.getManyAndCount();
  }
}
