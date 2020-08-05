import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // name: 'connection1',
      type: 'mongodb',
      useNewUrlParser: true,
      url: process.env.DB_URL,
      entities: [__dirname + '/../**/*.entity.js'],
      ssl: true,
      authSource: 'admin',
      synchronize: true,
      useUnifiedTopology: true,
    }),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {
}
