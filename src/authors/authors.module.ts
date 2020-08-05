import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { BookRepository } from '../books/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository, BookRepository])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {
}
