import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../entities/exam.entity';
import { ExamService } from '../services/exam.service';
import { ExamController } from '../controllers/exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamService],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExamModule {} 