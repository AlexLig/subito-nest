import { HttpException, HttpStatus } from '@nestjs/common';

const notFoundMsg = 'Employee with given id was not found';
export const notFoundException = (value: any, message?: string) => {
  if (!value) {
    throw new HttpException(message || notFoundMsg, HttpStatus.NOT_FOUND);
  }
};
