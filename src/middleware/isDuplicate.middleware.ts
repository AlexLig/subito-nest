import { getRepository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { databaseWriteException } from 'src/shared';

type Properties = 'vat' | 'ame';
type Entities = 'Employee' | 'Employer';

const isDuplicate = (property: Properties) => (repository: Entities) => {
  return async (req: any, res: any, next: any) => {
    const value = req.body[property];
    let duplicate;

    try {
      // ? If property doesnt exist for this Entity, the repo returns the first row in the table.
      duplicate = await getRepository(repository).findOne({
        [property]: value,
      });
    } catch (e) {
      throw databaseWriteException();
    }

    if (duplicate) {
      throw new HttpException(
        `Middleware worked! ${property} is duplicate`,
        400,
      );
    }
    next();
  };
};

const isDuplicateVat = isDuplicate('vat');
export const isDuplicateVatEmployee = isDuplicateVat('Employee');
export const isDuplicateVatEmployer = isDuplicateVat('Employer');
