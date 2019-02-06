import { Injectable } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  notFoundException,
  serverErrorException,
  duplicateException,
} from 'src/shared/HttpExceptions';
import { employerErrors, generalErrors } from 'src/shared';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  // * GET
  async findAll(): Promise<Employer[]> {
    const employers = await this.repository.find();
    if (employers.length < 1) throw notFoundException();

    return employers;
  }

  async findById(id: string, getAll = false): Promise<Employer> {
    const employer = await this.repository.findOne(
      id,
      getAll && { relations: ['employees'] },
    );

    if (!employer) throw notFoundException(employerErrors.NOT_FOUND);

    return employer;
  }

  // * POST
  async create(employerInfo: CreateEmployerDto): Promise<Employer> {
    const { vat } = employerInfo;
    const duplicate = await this.repository.findOne({ vat });
    if (duplicate) throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);

    try {
      return await this.repository.save(employerInfo);
    } catch (e) {
      throw serverErrorException(e);
    }
  }

  // * PUT
  async update(
    id: string,
    employerDto: Partial<CreateEmployerDto>,
  ): Promise<Employer> {
    const employerToUpdate = await this.findById(id);
    const updated = { ...employerToUpdate, ...employerDto };

    try {
      return await this.repository.save(updated);
    } catch (e) {
      throw serverErrorException(e);
    }
  }

  // * DELETE
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findById(id);

    return await this.repository.remove(employerToDelete);
  }
}
