import {
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';
import { CreateApplicationDto } from './create-application.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
