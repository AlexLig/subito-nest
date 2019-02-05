import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import {
  notFoundException,
  employerErrors,
  employeeErrors,
  duplicateException,
} from 'src/shared';
import { Employer } from 'src/employer/employer.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  // * POST
  async create(employeeDto: CreateEmployeeDto) {
    const { employerId } = employeeDto;
    const employer = await this.employerRepository.findOne(employerId);
    notFoundException(employer, employerErrors.NOT_FOUND);

    const duplicate = this.employeeRepository.findOne({ vat: employeeDto.vat });
    duplicateException(duplicate, employeeErrors.VAT_MUST_BE_UNIQUE);

    const employeeToCreate = { ...employeeDto, employer };
    const employee = this.employeeRepository.create(employeeToCreate);

    return await this.employeeRepository.save(employee);
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    notFoundException(employee, employeeErrors.NOT_FOUND);

    return employee;
  }

  // async findByEmployerId(id: string) {
  //   const employer = await this.employerRepository.findOne(id);
  //   notFoundException(employer, employerErrors.NOT_FOUND);

  //   return this.employeeRepository.find({ employer });
  // }

  // * PUT
  async findByIdAndUpdate(id: string, employeeDto: Partial<CreateEmployeeDto>) {
    const employeeToUpdate = await this.findById(id);

    const updated: Employee = { ...employeeToUpdate, ...employeeDto };
    const { employerId } = employeeDto;

    if (employerId) {
      const employer = await this.employerRepository.findOne(employerId);
      notFoundException(employer, employerErrors.NOT_FOUND);
      const updatedWithEmployer: Employee = { ...updated, employer };

      return await this.employeeRepository.save(updatedWithEmployer);
    }

    return await this.employeeRepository.save(updated);
  }

  // * DELETE
  async findByIdAndDelete(id: string) {
    const employeeToDelete = await this.findById(id);

    return await this.employeeRepository.remove(employeeToDelete);
  }
}
