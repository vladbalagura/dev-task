import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { TransformClassToPlain } from 'class-transformer';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository) private authorRepository: AuthorRepository,
  ) {
  }

  @TransformClassToPlain()
  async getAuthors(): Promise<Author[]> {
    return await this.authorRepository.getAuthors();
  }

  @TransformClassToPlain()
  async getAuthorById(id: string): Promise<Author> {
    const found = await this.authorRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Author with ID '${id}' not found`);
    }

    return found;
  }

  @TransformClassToPlain()
  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.authorRepository.createAuthor(createAuthorDto);
  }

  @TransformClassToPlain()
  async updateAuthor(
    id: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return await this.authorRepository.updateAuthor(id, createAuthorDto);
  }

  @TransformClassToPlain()
  async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
