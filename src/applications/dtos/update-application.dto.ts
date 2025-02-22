import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateApplicationDto } from './create-application.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
