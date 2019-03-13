import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  notFoundException,
  error500,
  duplicateException,
} from 'src/shared/HttpExceptions';
import { employerErrors as e, generalErrors } from 'src/shared';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  /** Returns an array of all the Employers. */
  async findAllOrFail(): Promise<Employer[]> {
    // Get all employers.
    const employers: Employer[] = await this.repository.find();

    // If none, throw not found.
    if (employers.length < 1)
      throw new HttpException(e.NOT_FOUND_MANY, HttpStatus.NOT_FOUND);

    return employers;
  }

  /**
   * Returns an Employer by its ID. If getRelatedEmployees is true,
   * adds Employee[] property as employer.employees property.
   */
  async findByIdOrFail(id: string, getRelatedEmployees = false): Promise<Employer> {
    let employer: Employer;

    // If not getRelated, find Employer.
    if (!getRelatedEmployees) employer = await this.repository.findOne(id);

    // If getRelated, find Employer with relations 'employees'.
    if (getRelatedEmployees) {
      employer = await this.repository.findOne(id, {
        relations: ['employees'],
      });
    }

    // If not found, throw 404.
    if (!employer) throw new HttpException(e.NOT_FOUND, HttpStatus.NOT_FOUND);

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
      throw error500(e);
    }
  }

  // * PUT
  async update(
    id: string,
    employerDto: Partial<CreateEmployerDto>,
  ): Promise<Employer> {
    const employerToUpdate = await this.findByIdOrFail(id);
    const updated = { ...employerToUpdate, ...employerDto };
    const { vat } = employerDto;
    if (vat) {
      const duplicate = await this.repository.findOne({ vat });
      if (duplicate && duplicate.id.toString() !== id) {
        throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
      }
    }

    try {
      return await this.repository.save(updated);
    } catch (e) {
      throw error500(e);
    }
  }

  // * DELETE
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findByIdOrFail(id);

    try {
      return await this.repository.remove(employerToDelete);
    } catch (e) {
      throw error500(e);
    }
  }
}
