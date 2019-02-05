import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { notFoundException } from 'src/shared/HttpExceptions';
import { employerErrors } from 'src/shared';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  // * GET
  async findAll(): Promise<Employer[]> {
    const employers = await this.repository.find();
    // TODO: Throw exception or handle empty array on the front end?
    // notFoundException(employers[0]);

    return employers;
  }
  async findById(id: string): Promise<Employer> {
    const employer = await this.repository.findOne(id);
    if (!employer) {
      throw notFoundException(employerErrors.NOT_FOUND);
    }

    return employer;
  }

  // * POST
  async create(employerInfo: CreateEmployerDto): Promise<Employer> {
    try {
      return await this.repository.save(employerInfo);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
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
      throw e;
    }
  }

  // * DELETE
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findById(id);

    return await this.repository.remove(employerToDelete);
  }
}
