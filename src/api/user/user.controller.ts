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
import { Auth, AuthRequest } from '../auth/decorators/auth.decorator';
import { Authenticate } from '../auth/decorators/authenticate.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateUserDto } from './dtos/bodies/createUser.dto';
import { DeleteManyUserDto } from './dtos/bodies/deleteManyUser.dto';
import { EditMeDto } from './dtos/bodies/editMe.dto';
import { EditUserDto } from './dtos/bodies/editUser.dto';
import { GetUserParamDto } from './dtos/params/getUserParam.dto';
import { GetUserDto } from './dtos/queries/getUser.dto';
import { UserExistDto } from './dtos/queries/userExist.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Người dùng')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Authenticate(Role.Admin, Role.Employee)
  async getUsers(@Query() getUserDto: GetUserDto) {
    const { ids, limit, offset, fullName } = getUserDto;
    const data = await this.userService.findAll({
      ids,
      limit,
      offset,
      fullName,
    });
    return new JsonCollection(data[0])
      .setLimit(getUserDto.limit)
      .setOffset(getUserDto.offset)
      .setTotal(data[1]);
  }

  @Get('me')
  @Authenticate(Role.Admin, Role.Employee, Role.User)
  async getMe(@Auth() auth: AuthRequest) {
    const user = await this.userService.findById(auth.userId);
    return new JsonEntity(user);
  }
  @Put('me')
  @Authenticate(Role.Admin, Role.Employee, Role.User)
  async editMe(@Auth() auth: AuthRequest, @Body() editMeDto: EditMeDto) {
    const user = await this.userService.findById(auth.userId, true);
    const newUser = plainToInstance(User, { ...user, ...editMeDto });
    await this.userService.update(newUser);
    return new JsonEntity(newUser);
  }

  @Post()
  @Authenticate(Role.Admin, Role.Employee)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = plainToInstance(User, createUserDto);
    await this.userService.update(user);
    return new JsonEntity(user);
  }

  @Get('exist')
  async userExist(@Query() userExistDto: UserExistDto) {
    return new JsonAction();
  }

  @Get(':id')
  @Authenticate(Role.Admin, Role.Employee)
  async getUserById(@Param() getUserParamDto: GetUserParamDto) {
    const data = await this.userService.findById(getUserParamDto.id);
    return new JsonEntity(data);
  }

  @Put(':id')
  @Authenticate(Role.Admin, Role.Employee)
  async updateUser(
    @Param() getUserParamDto: GetUserParamDto,
    @Body() editUserDto: EditUserDto,
  ) {
    const user = await this.userService.findById(getUserParamDto.id, true);
    const newUser = plainToInstance(User, { ...user, ...editUserDto });
    await this.userService.update(newUser);
    return new JsonEntity(newUser);
  }

  @Delete()
  @Authenticate(Role.Admin, Role.Employee)
  async removeUser(@Body() deleteManyUserDto: DeleteManyUserDto) {
    await this.userService.deleteMany(deleteManyUserDto.ids);
    return new JsonAction();
  }
}
