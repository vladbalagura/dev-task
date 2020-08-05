import {
  BaseEntity,
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Author extends BaseEntity {
  @ObjectIdColumn()
  @ApiProperty({ type: String })
  @Type(() => String)
  id: ObjectID;

  @Column()
  @ApiProperty()
  @Type(() => String)
  firstName: string;

  @Column()
  @ApiProperty()
  @Type(() => String)
  lastName: string;

  @Column()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  birthday: Date;

  @CreateDateColumn()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ type: String, format: 'date-time' })
  @Type(() => Date)
  updatedAt: Date;
}
