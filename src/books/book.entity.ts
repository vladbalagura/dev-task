import {
  BaseEntity,
  Entity,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ObjectIdColumn,
  Unique,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['iban'])
export class Book extends BaseEntity {
  @ObjectIdColumn()
  @ApiProperty({ type: String })
  @Type(() => String)
  id: ObjectID;

  @Column()
  @ApiProperty()
  @Type(() => String)
  title: string;

  @Column('rowid')
  @ApiProperty()
  @Type(() => String)
  author: string;

  @Column()
  @ApiProperty()
  @Type(() => String)
  iban: string;

  @Column()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  publishedAt: Date;

  @CreateDateColumn()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  updatedAt: Date;
}
