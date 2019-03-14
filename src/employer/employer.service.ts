import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employer } from './employer.entity';
import { EmployerDto } from './employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { employerErrors as e, generalErrors as ge } from 'src/shared';

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
  async findByIdOrFail(
    id: string,
    getRelatedEmployees = false,
  ): Promise<Employer> {
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

  /** Saves an Employer to the db and returns it. If vat is duplicate, throws bad request */
  async createOrFail(dto: EmployerDto): Promise<Employer> {
    // If vat is duplicate, throw bad request.
    const duplicate: Employer = await this.repository.findOne({ vat: dto.vat });
    if (duplicate)
      throw new HttpException(ge.VAT_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);

    return await this.repository.save(dto);
  }

  /**
   * Finds and updates an Employer.
   * If the inserted vat is a duplicate (exists on another Employer), throw Error.
   */
  async updateOrFail(id: string, dto: Partial<EmployerDto>): Promise<Employer> {
    // If vat is duplicate, throw bad request.
    if (dto.vat) {
      const duplicate = await this.repository.findOne({ vat: dto.vat });
      if (duplicate && duplicate.id.toString() !== id)
        throw new HttpException(ge.VAT_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    // Find Employer to update.
    const employerToUpdate = await this.findByIdOrFail(id);

    // Merge Employer with dto.
    const updated: Employer = { ...employerToUpdate, ...dto };

    // Save to db.
    return await this.repository.save(updated);
  }

  /** Removes an Employer from the db by its ID, and returns the deleted Employer. */
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findByIdOrFail(id);

    return await this.repository.remove(employerToDelete);
  }
}
