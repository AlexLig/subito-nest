import { Injectable } from '@nestjs/common';
import { Employer } from './employer.entity';
import { CreateEmployerDto } from './createEmployer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  async findAll(): Promise<Employer[]> {
    return await this.repository.find();
  }
  async findOne(id: string) {
    return await this.repository.findOne(id);
  }

  async create(employerInfo: CreateEmployerDto): Promise<Employer> {
    return await this.repository.save(employerInfo);
  }
  async update(id: string, employer: CreateEmployerDto) {
    await this.repository.update(id, employer);
    return await this.repository.findOne(id);
  }
}
