import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Exam } from './exam.entity';
import { User } from './user.entity';
import { UserAnswer } from './user-answer.entity';

@Entity()
export class UserExam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Exam, exam => exam.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'examId' })
  exam: Exam;

  @Column()
  examId: number;

  @Column({ type: 'timestamp', nullable: true })
  startedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt?: Date;

  @Column({ type: 'float', nullable: true })
  score?: number;

  @Column({ length: 50, default: 'doing' })
  status: string;

  @OneToMany(() => UserAnswer, ua => ua.userExam)
  userAnswers: UserAnswer[];
} 