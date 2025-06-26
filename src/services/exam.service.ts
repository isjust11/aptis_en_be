import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from '../entities/exam.entity';
import { ExamDto } from '../dtos/exam.dto';
import { Question } from '../entities/question.entity';
import { ExamQuestion } from '../entities/exam-question.entity';
import { CreateQuestionDto } from '../dtos/question.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(ExamQuestion)
    private examQuestionRepository: Repository<ExamQuestion>,
  ) {}

  async create(dto: ExamDto): Promise<Exam> {
    const entity = this.examRepository.create(dto);
    return this.examRepository.save(entity);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async findOne(id: number): Promise<Exam> {
    const entity = await this.examRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Exam not found');
    return entity;
  }

  async update(id: number, dto: ExamDto): Promise<Exam> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.examRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.examRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Exam not found');
  }

  async createQuestionsForExam(examId: number, questions: CreateQuestionDto[]): Promise<Question[]> {
    const exam = await this.findOne(examId);
    const createdQuestions: Question[] = [];

    for (let i = 0; i < questions.length; i++) {
      const questionData = questions[i];
      const question = this.questionRepository.create({
        ...questionData,
        options: questionData.options || [],
        isActive: true
      });
      
      const savedQuestion = await this.questionRepository.save(question);
      createdQuestions.push(savedQuestion);

      // Tạo liên kết với exam
      const examQuestion = this.examQuestionRepository.create({
        exam: exam,
        question: savedQuestion,
        order: i + 1
      });
      
      await this.examQuestionRepository.save(examQuestion);
    }

    return createdQuestions;
  }

  async getQuestionsByExam(examId: number): Promise<Question[]> {
    const examQuestions = await this.examQuestionRepository.find({
      where: { exam: { id: examId } },
      relations: ['question'],
      order: { order: 'ASC' }
    });

    return examQuestions.map(eq => eq.question);
  }
} 