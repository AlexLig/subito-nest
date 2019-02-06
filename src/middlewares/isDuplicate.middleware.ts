import { getRepository, Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { databaseWriteException } from 'src/shared';
import { repositories as r } from '../shared';

type properties = 'vat' | 'ame';

const isDuplicate = (property: properties) => (repository: string) => async (
  req: any,
  res: any,
  next: any,
) => {
  const value = req.body[property];
  let duplicate;

  if (repository !== r.EMPLOYEE && repository !== r.EMPLOYER) {
    throw new HttpException('Wrong repository', 400);
  }

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
