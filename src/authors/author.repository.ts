import {
  Repository,
  EntityRepository,
  getMongoManager,
} from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Book } from '../books/book.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  async getAuthors(): Promise<Author[]> {
    return await this.find();
  }

  async getAuthorById(id: string): Promise<Author> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`Author with ID '${id}' not found`);
    }

    return found;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const { firstName, lastName, birthday } = createAuthorDto;

    const author = new Author();
    author.firstName = firstName;
    author.lastName = lastName;
    author.birthday = new Date(birthday);
    await author.save();

    return author;
  }

  async updateAuthor(
    id: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    await this.getAuthorById(id);

    await this.update(id, {
      ...createAuthorDto,
      updatedAt: new Date(),
    });

    return await this.findOne(id);
  }

  async deleteAuthor(id: string): Promise<void> {
    const manager = getMongoManager();
    const author = await this.getAuthorById(id);

    await this.remove(author);

    await manager.deleteMany(Book, { author: id });
  }
}
