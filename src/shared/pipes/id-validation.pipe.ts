import {
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { ObjectID } from 'mongodb';

export class IdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!IdValidationPipe.isIdValid(value)) {
      throw new BadRequestException(`'${value}' is an invalid ID`);
    }

    return value;
  }

  private static isIdValid(id: any) {
    return ObjectID.isValid(id);
  }
}
