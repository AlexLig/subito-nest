import { HttpException, HttpStatus } from '@nestjs/common';
import { generalErrors as e } from './';

/** Throws a 404 Not Found HTTP exception if the value does not exist. */
export const notFoundException = (value: any, message = e.NOT_FOUND) => {
  if (!value) {
    throw new HttpException(message, HttpStatus.NOT_FOUND);
  }
};

/** Throws a 409 Conflict Http exception if the value exists. */
export const duplicateException = (value: any, message: string) => {
  if (value) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
};
