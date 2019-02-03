import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findById(id: any) {
    return await this.employeeRepository.findOne(id);
  }

  async findByIdAndUpdate(
    id: string,
    createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    await this.employeeRepository.update(id, createEmployeeDto);
    return this.employeeRepository.findOne(id);
  }

  async findByIdAndDelete(id: string) {
    return await this.employeeRepository.delete(id);
  }
}
