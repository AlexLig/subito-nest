import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { notFoundException } from 'src/shared/HttpExceptions';
import { Employer } from 'src/employer/employer.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { employerId } = createEmployeeDto;

    const employer = await this.employerRepository.findOne(employerId);
    notFoundException(employer, 'Employer with given Id was not found');

    const employeeToCreate = { ...createEmployeeDto, employer };
    const employee = this.employeeRepository.create(employeeToCreate);

    return await this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findById(id: string) {
    const employee = await this.employeeRepository.findOne(id);
    notFoundException(employee);
    return employee;
  }

  async findByIdAndUpdate(
    id: string,
    createEmployeeDto: Partial<CreateEmployeeDto>,
  ) {
    const employeeToUpdate = await this.employeeRepository.findOne(id);
    notFoundException(employeeToUpdate);

    const { employerId } = createEmployeeDto;
    if (employerId) {
      const employer = await this.employerRepository.findOne(employerId);
      notFoundException(employer, 'Employer with given Id was not found');
      const updated: Employee = {
        ...employeeToUpdate,
        ...createEmployeeDto,
        employer,
      };
      return await this.employeeRepository.save(updated);
    } else {
      const updated: Employee = {
        ...employeeToUpdate,
        ...createEmployeeDto,
      };
      return await this.employeeRepository.save(updated);
    }
  }

  async findByIdAndDelete(id: string) {
    const employeeToDelete = await this.employeeRepository.findOne(id);
    notFoundException(employeeToDelete);
    return await this.employeeRepository.remove(employeeToDelete);
  }
}
