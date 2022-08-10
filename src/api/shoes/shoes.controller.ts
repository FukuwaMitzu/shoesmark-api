import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JsonCollection } from 'src/shared/JsonCollection';
import { JsonEntity } from 'src/shared/JsonEntity';
import { CreateShoesDto } from './dtos/bodies/createShoes.dto';
import { ShoesParamDto } from './dtos/params/shoesParam.dto';
import { GetShoesDto } from './dtos/queries/getShoes.dto';
import { ShoesService } from './shoes.service';
import * as fs from 'fs';
import { Express } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Shoes } from './entities/shoes.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Color } from '../color/entities/color.entity';
import { JsonAction } from 'src/shared/JsonAction';
import { EditShoesDto } from './dtos/bodies/editShoes.dto';
import { isDefined } from 'class-validator';
import { Category } from '../category/entities/category.entity';
import { DeleteManyShoesDto } from './dtos/bodies/deleteManyShoes.dto';

@ApiTags('Giày')
@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

  @Get()
  async getShoes(@Query() getShoesDto: GetShoesDto) {
    const { limit, offset, ids, shoesName, categoryIds, colorId, price, size} = getShoesDto;
    const data = await this.shoesService.findAll({ limit, offset, ids, shoesName, categoryIds, colorId, price, size });
    return new JsonCollection(data[0])
      .setLimit(limit)
      .setOffset(offset)
      .setTotal(data[1]);
  }

  @Get(':id')
  async getShoesById(@Param() shoesParamDto: ShoesParamDto) {
    const data = await this.shoesService.findById(shoesParamDto.id);
    return new JsonEntity(data);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('shoesImage'))
  async createShoes(
    @Body() createShoesDto: CreateShoesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileType = file.mimetype.match(/^.*\/(.*)/i)[1];
    const newPath = file.path + '.' + fileType;
    fs.renameSync(file.path, newPath);

    const shoes = plainToInstance(Shoes, createShoesDto);

    const brand = new Brand();
    brand.brandId = createShoesDto.brandId;
    shoes.brand = brand;

    const color = new Color();
    color.colorId = createShoesDto.colorId;
    shoes.color = color;

    shoes.shoesImage = newPath.replace("\\", "/");

    shoes.categories = createShoesDto.categories.map((categoryId) =>
      plainToInstance(Category, { categoryId: categoryId }),
    );

    await this.shoesService.update(shoes);
    return new JsonEntity(instanceToPlain(shoes));
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('shoesImage'))
  async editShoes(
    @Param() shoesParamDto: ShoesParamDto,
    @Body() editShoesDto: EditShoesDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let shoes = await this.shoesService.findById(shoesParamDto.id);
    shoes = plainToInstance(Shoes, { ...shoes, ...editShoesDto });

    const brand = new Brand();
    brand.brandId = editShoesDto.brandId;
    shoes.brand = brand;

    const color = new Color();
    color.colorId = editShoesDto.colorId;
    shoes.color = color;

    shoes.categories = editShoesDto.categories.map((categoryId) =>
      plainToInstance(Category, { categoryId: categoryId }),
    );

    if (isDefined(file)) {
      const fileType = file.mimetype.match(/^.*\/(.*)/i)[1];
      const newPath = file.path + '.' + fileType;
      fs.renameSync(file.path, newPath);

      shoes.shoesImage = newPath.replace("\\", "/");
    }
    await this.shoesService.update(shoes);
    return new JsonEntity(shoes);
  }

  @Delete(':id')
  async deleteShoes(@Param() shoesParamDto: ShoesParamDto) {
    await this.shoesService.deleteById(shoesParamDto.id);
    return new JsonAction();
  }

  @Delete()
  async deleteManyShoes(@Body() deleteManyShoesDto: DeleteManyShoesDto) {
    await this.shoesService.deleteMany(deleteManyShoesDto.ids);
    return new JsonAction();
  }
}
