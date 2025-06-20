import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { UserExamService } from '../services/user-exam.service';
import { UserExamDto } from '../dtos/user-exam.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('user-exam')
@UseInterceptors(EncryptionInterceptor)
export class UserExamController {
  constructor(private readonly userExamService: UserExamService) {}

  @Post()
  create(@Body() dto: UserExamDto) {
    return this.userExamService.create(dto);
  }

  @Get()
  findAll() {
    return this.userExamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userExamService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UserExamDto) {
    return this.userExamService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userExamService.remove(Number(id));
  }
} 