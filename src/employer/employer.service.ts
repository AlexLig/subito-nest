import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { notFoundException } from 'src/shared/HttpExceptions';
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
    const { ame } = employerInfo;
    if (ame && ame.length !== 10) {
      throw new HttpException(generalErrors.AME_LENGTH, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.repository.save(employerInfo);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * DELETE
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findById(id);

    return await this.repository.remove(employerToDelete);
  }
}
