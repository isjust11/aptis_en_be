import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ExamService } from '../services/exam.service';
import { ExamDto } from '../dtos/exam.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('exam')
@UseInterceptors(EncryptionInterceptor)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() dto: ExamDto) {
    return this.examService.create(dto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ExamDto) {
    return this.examService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(Number(id));
  }
} 