import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';
import { SkillType } from '../entities/question.entity';

export class QuestionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  content: string;

  @IsEnum(SkillType)
  skill: SkillType;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  options?: string[];

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 