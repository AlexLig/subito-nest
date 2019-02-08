import { getRepository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { databaseWriteException, Entities } from 'src/shared';

type Properties = 'vat' | 'ame';
// type Repositories = r.EMPLOYEE;

const isDuplicate = (property: Properties) => (repository: Entities) => async (
  req: any,
  res: any,
  next: any,
) => {
  // if (repository !== r.EMPLOYEE && repository !== r.EMPLOYER) {
  //   throw new HttpException('Wrong repository', 400);
  // }

  const value = req.body[property];
  let duplicate;

  try {
    // ! If property doesnt exist for this Entity, the repo returns the first row in the table.
    duplicate = await getRepository(repository).findOne({
      [property]: value,
    });
  } catch (e) {
    throw databaseWriteException();
  }

  if (duplicate) {
    throw new HttpException(`Middleware worked! ${property} is duplicate`, 400);
  }
  next();
};

export const isDuplicateVat = isDuplicate('vat');
