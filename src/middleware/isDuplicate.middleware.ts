import { getRepository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { databaseWriteException } from 'src/shared';

type Properties = 'vat' | 'ame';
type Entities = 'Employee' | 'Employer';

const isDuplicate = (property: Properties) => (repository: Entities) => {
  return async (req: any, res: any, next: any) => {
    const value = req.body[property];

    // If property doesnt exist for this Entity, the repo returns the first row in the table.
    const duplicate = await getRepository(repository).findOne({
      [property]: req.body[property],
    });

    if (duplicate)
      throw new HttpException(
        `Middleware worked! ${property} is duplicate`,
        HttpStatus.BAD_REQUEST,
      );

    next();
  };
};

const isDuplicateVat = isDuplicate('vat');
export const isDuplicateVatEmployee = isDuplicateVat('Employee');
export const isDuplicateVatEmployer = isDuplicateVat('Employer');
