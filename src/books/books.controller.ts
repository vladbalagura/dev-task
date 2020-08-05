import {
  Controller,
  Get,
  Param,
  UsePipes,
  Post,
  Body,
  ValidationPipe,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IdValidationPipe } from '../shared/pipes/id-validation.pipe';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
  }

  @Get('/author/:authorId')
  @ApiOperation({ summary: 'Get books by one author' })
  @ApiResponse({ type: [Book] })
  getBooksByAuthorId(
    @Param('authorId', IdValidationPipe) authorId: string,
  ): Promise<Book[]> {
    return this.booksService.getBooksByAuthorId(authorId);
  }

  @Get('/:bookId')
  @ApiOperation({ summary: 'Get one book' })
  @ApiResponse({ type: Book })
  getBookById(
    @Param('bookId', IdValidationPipe) bookId: string,
  ): Promise<Book> {
    return this.booksService.getBookById(bookId);
  }

  @Post('/author/:authorId')
  @ApiOperation({ summary: 'Add book' })
  @ApiResponse({ type: Book })
  createBook(
    @Param('authorId', IdValidationPipe) authorId: string,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.createBook(authorId, createBookDto);
  }

  @Put('/:bookId')
  @ApiOperation({ summary: 'Update book' })
  @ApiResponse({ type: Book })
  updateBook(
    @Param('bookId', IdValidationPipe) bookId: string,
    @Body(ValidationPipe) createBookDto: CreateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, createBookDto);
  }

  @Delete('/:bookId')
  @UsePipes(IdValidationPipe)
  @ApiOperation({ summary: 'Remove book' })
  @HttpCode(204)
  deleteBook(
    @Param('bookId') bookId: string,
  ): Promise<void> {
    return this.booksService.deleteBook(bookId);
  }
}
