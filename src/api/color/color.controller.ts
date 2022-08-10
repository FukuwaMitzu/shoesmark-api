import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JsonAction } from 'src/shared/JsonAction';
import { JsonCollection } from 'src/shared/JsonCollection';
import { JsonEntity } from 'src/shared/JsonEntity';
import { ColorService } from './color.service';
import { CreateColorDto } from './dtos/bodies/createColor.dto';
import { DeleteManyColorDto } from './dtos/bodies/deleteManyColor.dto';
import { EditColorDto } from './dtos/bodies/editColor.dto';
import { ColorParamDto } from './dtos/params/colorParam.dto';
import { GetColorDto } from './dtos/queries/getColor.dto';
import { Color } from './entities/color.entity';

@ApiTags('Màu sắc')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  async getColor(@Query() getColorDto: GetColorDto) {
    const { limit, offset, colorName } = getColorDto;
    const data = await this.colorService.findAll({ limit, offset, colorName });
    return new JsonCollection(data[0])
      .setLimit(limit)
      .setOffset(offset)
      .setTotal(data[1]);
  }

  @Get(':id')
  async getColorById(@Param() colorParamDto: ColorParamDto) {
    const data = await this.colorService.findById(colorParamDto.id);
    return new JsonEntity(data);
  }

  @Post()
  async createColor(@Body() createColorDto: CreateColorDto) {
    const color = plainToInstance(Color, createColorDto);
    await this.colorService.update(color);
    return new JsonEntity(color);
  }

  @Put(':id')
  async editColor(
    @Param() colorParamDto: ColorParamDto,
    @Body() editColorDto: EditColorDto,
  ) {
    let color = await this.colorService.findById(colorParamDto.id);
    color = plainToInstance(Color, { ...color, ...editColorDto });
    await this.colorService.update(color);
    return new JsonEntity(color);
  }

  @Delete(':id')
  async deleteColor(@Param() colorParamDto: ColorParamDto) {
    await this.colorService.deleteById(colorParamDto.id);
    return new JsonAction();
  }

  @Delete()
  async deleteColorMany(@Body() deleteManyColorDto: DeleteManyColorDto) {
    await this.colorService.deleteMany(deleteManyColorDto.ids);
    return new JsonAction();
  }
}
