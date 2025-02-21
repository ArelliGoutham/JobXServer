import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetApplicationsBaseQueryDto {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}

export class GetApplicationsQueryDto extends IntersectionType(
  GetApplicationsBaseQueryDto,
  PaginationQueryDto,
) {}
