import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.repository.create(createEmployeeDto);
    return await this.repository.save(employee);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: any) {
    return await this.repository.findOne(id);
  }

  async findByIdAndUpdate(
    id: string,
    createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    const employeeToUpdate = await this.repository.findOne(id);
    const updated: Employee = { ...employeeToUpdate, ...createEmployeeDto };
    return await this.repository.save(updated);
  }

  async findByIdAndDelete(id: string) {
    const employeeToDelete = await this.repository.findOne(id);
    return await this.repository.remove(employeeToDelete);
  }
}
