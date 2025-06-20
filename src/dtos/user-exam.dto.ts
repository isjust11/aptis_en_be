import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class UserExamDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  examId: number;

  @IsOptional()
  @IsDateString()
  startedAt?: Date;

  @IsOptional()
  @IsDateString()
  finishedAt?: Date;

  @IsOptional()
  score?: number;

  @IsOptional()
  @IsString()
  status?: string;
} 