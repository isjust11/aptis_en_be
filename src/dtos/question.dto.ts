import { IsString, IsOptional, IsEnum, IsBoolean, IsNumber } from 'class-validator';
import { SkillType } from '../enums/skill-type.enum';
import { QuestionType } from 'src/enums/question-type.enum';

export class QuestionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  content: string;

  @IsEnum(SkillType)
  skill: SkillType;

  @IsOptional()
  @IsEnum(QuestionType)
  type?: QuestionType;

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