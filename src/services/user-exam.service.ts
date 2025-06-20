import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserExam } from '../entities/user-exam.entity';
import { UserExamDto } from '../dtos/user-exam.dto';

@Injectable()
export class UserExamService {
  constructor(
    @InjectRepository(UserExam)
    private userExamRepository: Repository<UserExam>,
  ) {}

  async create(dto: UserExamDto): Promise<UserExam> {
    const entity = this.userExamRepository.create(dto);
    return this.userExamRepository.save(entity);
  }

  async findAll(): Promise<UserExam[]> {
    return this.userExamRepository.find();
  }

  async findOne(id: number): Promise<UserExam> {
    const entity = await this.userExamRepository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('UserExam not found');
    return entity;
  }

  async update(id: number, dto: UserExamDto): Promise<UserExam> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.userExamRepository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userExamRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('UserExam not found');
  }
} 