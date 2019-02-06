import { HttpException, HttpStatus } from '@nestjs/common';
import { generalErrors as e } from './';

/** Returns a 404 Not Found HTTP exception. */
export const notFoundException = (message = e.NOT_FOUND) =>
  new HttpException(message, HttpStatus.NOT_FOUND);

/** Returns a 400 Bad Request Http exception. */
export const duplicateException = (message: string) =>
  new HttpException(message, HttpStatus.BAD_REQUEST);

export const serverErrorException = (err?: any) =>
  new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
