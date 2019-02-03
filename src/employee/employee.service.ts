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

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { name, vat } = createEmployeeDto;

    const employee = new Employee();
    employee.name = name;
    employee.vat = vat;

    return this.employeeRepository.save(employee);
  }
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }
}
