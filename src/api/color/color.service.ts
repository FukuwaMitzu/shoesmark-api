import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICRUDService } from 'src/shared/interfaces/ICRUDService.interface';
import { IFindAllOptions } from 'src/shared/interfaces/IFindAllOptions.interface';
import { ILike, In, Repository } from 'typeorm';
import { Color } from './entities/color.entity';

interface ColorFindAllOptions extends IFindAllOptions {
  colorName?: string;
}

@Injectable()
export class ColorService implements ICRUDService<Color> {
  constructor(
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}
  async findById(id: string): Promise<Color> {
    return await this.colorRepository.findOne({
      where: {
        colorId: id,
      },
    });
  }
  async findAll(options: ColorFindAllOptions): Promise<[Color[], number]> {
    return await this.colorRepository.findAndCount({
      skip: options.offset,
      take: options.limit,
      where: options.colorName
        ? { colorName: ILike(`%${options.colorName}%`) }
        : {},
    });
  }
  async update(value: Color): Promise<Color> {
    await this.colorRepository.save(value);
    return value;
  }
  async deleteById(id: string): Promise<void> {
    await this.colorRepository.delete({ colorId: id });
  }
  async deleteMany(ids: Array<string>): Promise<void> {
    await this.colorRepository.delete({ colorId: In(ids) });
  }
  getRepository(): Repository<Color> {
    return this.colorRepository;
  }
}
