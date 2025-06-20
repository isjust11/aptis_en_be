import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { UserAnswerService } from '../services/user-answer.service';
import { UserAnswerDto } from '../dtos/user-answer.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('user-answer')
@UseInterceptors(EncryptionInterceptor)
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Post()
  create(@Body() dto: UserAnswerDto) {
    return this.userAnswerService.create(dto);
  }

  @Get()
  findAll() {
    return this.userAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAnswerService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UserAnswerDto) {
    return this.userAnswerService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAnswerService.remove(Number(id));
  }
} 