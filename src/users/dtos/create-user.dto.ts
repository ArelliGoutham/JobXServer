import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRoles } from '../enums/userRoles.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  @IsOptional()
  password?: string;
}
