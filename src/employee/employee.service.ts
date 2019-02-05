import { Injectable, Inject } from '@nestjs/common';
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
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
    private readonly employerService: EmployerService,
  ) {}

  // * POST
  async create(employeeDto: CreateEmployeeDto) {
    const { employerId } = employeeDto;
    const employer = await this.employerService.findById(employerId);

    const duplicate = await this.repository.findOne({
      vat: employeeDto.vat,
    });
    duplicateException(duplicate, employeeErrors.VAT_MUST_BE_UNIQUE);

    const employeeToCreate = { ...employeeDto, employer };
    const employee = this.repository.create(employeeToCreate);

    return await this.repository.save(employee);
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.repository.findOne(id);
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
    let updated: Employee = { ...employeeToUpdate, ...employeeDto };

    const { employerId } = employeeDto;
    if (employerId) {
      const employer = await this.employerService.findById(employerId);
      updated = { ...updated, employer };
    }

    return await this.repository.save(updated);
  }

  // * DELETE
  async findByIdAndDelete(id: string) {
    const employeeToDelete = await this.findById(id);

    return await this.repository.remove(employeeToDelete);
  }
}
