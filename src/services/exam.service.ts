import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from '../entities/exam.entity';
import { ExamDto } from '../dtos/exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
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
} 