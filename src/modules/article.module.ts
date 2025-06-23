 import { Module } from '@nestjs/common';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { Article } from 'src/entities/article.entity';
 import { ArticleController } from 'src/controllers/article.controller';
 import { ArticleService } from 'src/services/article.service';
 
 @Module({
   imports: [TypeOrmModule.forFeature([Article])],
   providers: [ArticleService],
   controllers: [ArticleController],
   exports: [ArticleService],
 })
 export class ArticleModule {} 