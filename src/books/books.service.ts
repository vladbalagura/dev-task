import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { TransformClassToPlain } from 'class-transformer';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {
  }

  @TransformClassToPlain()
  async getBooksByAuthorId(authorId: string): Promise<Book[]> {
    return await this.bookRepository.getBooksByAuthorId(authorId);
  }

  @TransformClassToPlain()
  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  @TransformClassToPlain()
  async createBook(
    authorId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    return await this.bookRepository.createBook(authorId, createBookDto);
  }

  @TransformClassToPlain()
  async updateBook(
    bookId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    return await this.bookRepository.updateBook(
      bookId,
      createBookDto,
    );
  }

  @TransformClassToPlain()
  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
