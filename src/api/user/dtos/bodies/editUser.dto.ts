import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from 'src/api/auth/enums/role.enum';
import { Gender } from '../../enums/gender';
import { UserEmailMustNotExist } from '../../validators/decorators/userEmailMustNotExist.decorator';
import { UserNameMustNotExist } from '../../validators/decorators/userNameMustNotExist.decorator';

export class EditUserDto {
  @ApiPropertyOptional()
  @UserNameMustNotExist()
  @IsString()
  @IsOptional()
  username?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password?: string;
  @ApiPropertyOptional()
  @UserEmailMustNotExist()
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  @ApiPropertyOptional({
    type: 'enum',
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phoneNumber?: string;
  @ApiPropertyOptional({
    type: 'enum',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  district?: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;
}
