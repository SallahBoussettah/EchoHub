import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class CreateMilestoneDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
