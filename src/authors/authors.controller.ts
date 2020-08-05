import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import { IdValidationPipe } from '../shared/pipes/id-validation.pipe';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {
  }

  @Get()
  @ApiOperation({ summary: 'Get authors' })
  @ApiResponse({ type: [Author] })
  getAuthors(): Promise<Author[]> {
    return this.authorsService.getAuthors();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get one author' })
  @ApiResponse({ type: Author })
  getAuthorById(@Param('id', IdValidationPipe) id: string): Promise<Author> {
    return this.authorsService.getAuthorById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Add author' })
  @ApiResponse({ type: Author })
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update author' })
  @ApiResponse({ type: Author })
  updateAuthor(
    @Param('id', IdValidationPipe) id: string,
    @Body(ValidationPipe) createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(id, createAuthorDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Remove author' })
  @HttpCode(204)
  deleteAuthor(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.authorsService.deleteAuthor(id);
  }
}
