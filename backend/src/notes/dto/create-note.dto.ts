import { IsString, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  projectId?: string;
}
