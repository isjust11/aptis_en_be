import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors } from '@nestjs/common';
import { ArticleService } from '../services/article.service';
import { ArticleDto } from '../dtos/article.dto';
import { EncryptionInterceptor } from 'src/interceptors/encryption.interceptor';

@Controller('article')
@UseInterceptors(EncryptionInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() dto: ArticleDto) {
    return this.articleService.create(dto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ArticleDto) {
    return this.articleService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(Number(id));
  }
} 