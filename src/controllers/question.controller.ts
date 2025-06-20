import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { QuestionDto } from '../dtos/question.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('question')
@UseInterceptors(EncryptionInterceptor)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() dto: QuestionDto) {
    return this.questionService.create(dto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: QuestionDto) {
    return this.questionService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(Number(id));
  }
} 