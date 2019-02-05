import { HttpException, HttpStatus } from '@nestjs/common';
import { generalErrors as e } from './';

/** Returns a 404 Not Found HTTP exception if the value does not exist. */
export const notFoundException = (message = e.NOT_FOUND) =>
  new HttpException(message, HttpStatus.NOT_FOUND);

/** Returns a 404 Conflict Http exception if the value exists. */
export const duplicateException = (message: string) =>
  new HttpException(message, HttpStatus.BAD_REQUEST);
