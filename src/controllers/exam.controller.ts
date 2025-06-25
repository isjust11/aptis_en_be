import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ExamService } from '../services/exam.service';
import { ExamDto } from '../dtos/exam.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';
import { Base64EncryptionUtil } from 'src/utils/base64Encryption.util';

@Controller('exam')
@UseInterceptors(EncryptionInterceptor)
export class ExamController {
  constructor(private readonly examService: ExamService) { }

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
    return this.examService.findOne(this.decode(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ExamDto) {
    return this.examService.update(this.decode(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(this.decode(id));
  }
  private decode(id: string) {
    const idDecode = Base64EncryptionUtil.decrypt(id);
    return parseInt(idDecode);
  }
} 