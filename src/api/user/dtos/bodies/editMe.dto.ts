import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../../enums/gender';
import { UserEmailMustNotExist } from '../../validators/decorators/userEmailMustNotExist.decorator';

export class EditMeDto {
  @ApiPropertyOptional()
  @UserEmailMustNotExist()
  @IsEmail()
  @IsOptional()
  email?: string;
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
