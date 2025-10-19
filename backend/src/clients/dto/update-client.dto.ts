import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';

enum ClientStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @MaxLength(200)
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  company?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  website?: string;

  @IsEnum(ClientStatus)
  @IsOptional()
  status?: ClientStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
