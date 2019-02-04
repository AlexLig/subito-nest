import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { notFoundException } from 'src/shared/HttpExceptions';

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

  async findById(id: string) {
    const employee = await this.repository.findOne(id);
    notFoundException(employee);
    return employee;
  }

  async findByIdAndUpdate(
    id: string,
    createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    const employeeToUpdate = await this.repository.findOne(id);
    notFoundException(employeeToUpdate);
    const updated: Employee = { ...employeeToUpdate, ...createEmployeeDto };
    return await this.repository.save(updated);
  }

  async findByIdAndDelete(id: string) {
    const employeeToDelete = await this.repository.findOne(id);
    notFoundException(employeeToDelete);
    return await this.repository.remove(employeeToDelete);
  }
}
