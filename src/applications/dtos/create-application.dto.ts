import {
  IsString,
  IsOptional,
  IsEnum,
  IsUrl,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApplicationStatusEnum } from '../enums/application-status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Company for which you are applying' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  company: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  role: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  location: string;

  @ApiProperty({ enum: ApplicationStatusEnum })
  @IsEnum(ApplicationStatusEnum)
  @IsNotEmpty()
  status: ApplicationStatusEnum;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  salary?: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @MinLength(3)
  jobPostingLink: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  skills?: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  applicationSource: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @MinLength(3)
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  notes?: string;
}
