import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ExamQuestionService } from '../services/exam-question.service';
import { ExamQuestionDto } from '../dtos/exam-question.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('exam-question')
@UseInterceptors(EncryptionInterceptor)
export class ExamQuestionController {
  constructor(private readonly examQuestionService: ExamQuestionService) {}

  @Post()
  create(@Body() dto: ExamQuestionDto) {
    return this.examQuestionService.create(dto);
  }

  @Get()
  findAll() {
    return this.examQuestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examQuestionService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ExamQuestionDto) {
    return this.examQuestionService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examQuestionService.remove(Number(id));
  }
} 