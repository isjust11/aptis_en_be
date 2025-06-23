import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ExamQuestion } from './exam-question.entity';
import { SkillType } from '../enums/skill-type.enum';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: SkillType })
  skill: SkillType;

  @Column({ nullable: true })
  type?: string;

  @Column('simple-array', { nullable: true })
  options?: string[];

  @Column({ nullable: true })
  answer?: string;

  @Column({ nullable: true })
  explanation?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => ExamQuestion, eq => eq.question)
  examQuestions: ExamQuestion[];
} 