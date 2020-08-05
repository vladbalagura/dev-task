import { IsNotEmpty, IsIBAN, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIBAN()
  iban: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsNotEmpty()
  @IsNotEmpty()
  @IsDateString()
  publishedAt: Date;
}
