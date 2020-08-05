import { EntityRepository, getMongoManager, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(
    authorId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const manager = getMongoManager();
    const findAuthor = await manager.findOne('author', authorId);

    if (!findAuthor) {
      throw new NotFoundException(`Author with ID '${authorId}' not found`);
    } else {
      const { title, iban, publishedAt } = createBookDto;

      const book = new Book();
      book.title = title;
      book.iban = iban;
      book.publishedAt = publishedAt;
      book.author = authorId;
      try {
        await book.save();
      } catch (e) {
        throw new ConflictException();
      }

      return book;
    }
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Book with ID '${id}' not found`);
    }

    return found;
  }

  async getBooksByAuthorId(authorId: string): Promise<Book[]> {
    const manager = getMongoManager();
    const findAuthor = await manager.findOne('author', authorId);

    if (!findAuthor) {
      throw new NotFoundException(`Author with ID '${authorId}' not found`);
    } else {
      return await this.find({ author: authorId });
    }
  }

  async updateBook(
    id: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    await this.getBookById(id);

    try {
      await this.update(id, {
        ...createBookDto,
        updatedAt: new Date(),
      });
    } catch (e) {
      throw new ConflictException();
    }

    return await this.findOne(id);
  }
}
