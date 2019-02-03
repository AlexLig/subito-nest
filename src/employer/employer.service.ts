import { Injectable } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './dto/createEmployer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  // GET
  async findAll(): Promise<Employer[]> {
    return await this.repository.find();
  }
  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  // PUT
  async create(employerInfo: CreateEmployerDto): Promise<Employer> {
    return await this.repository.save(employerInfo);
  }

  // POST
  async update(id: string, employer: CreateEmployerDto) {
    await this.repository.update(id, employer);
    return await this.repository.findOne(id);
  }

  // DELETE
  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
