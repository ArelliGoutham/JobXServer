import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number) // For transforming string to number from the url params
  @ApiProperty({ description: 'Get User specific Applications' })
  userId?: number;
}
