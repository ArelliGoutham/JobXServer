import { IsOptional, IsNumber, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number', default: 1 })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'per page limit',
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
