import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import {
  notFoundException,
  employeeErrors,
  duplicateException,
  generalErrors,
  serverErrorException,
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
  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const { employerId, vat } = employeeDto;

    const duplicate = await this.repository.findOne({ vat });
    if (duplicate) {
      throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
    }

    const employer = await this.employerService.findById(employerId);
    const employeeToCreate = { ...employeeDto, employer };

    try {
      return await this.repository.save(employeeToCreate);
    } catch (e) {
      throw serverErrorException(e);
    }
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.repository.findOne(id);
    if (!employee) {
      throw notFoundException(employeeErrors.NOT_FOUND);
    }

    return employee;
  }

  // * PUT
  async findByIdAndUpdate(id: string, employeeDto: Partial<CreateEmployeeDto>) {
    const employeeToUpdate = await this.findById(id);
    let updated: Employee = { ...employeeToUpdate, ...employeeDto };

    const { employerId: empId, vat } = employeeDto;

    if (vat) {
      const duplicate = await this.repository.findOne({ vat });
      if (duplicate && duplicate.id.toString() !== id) {
        throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
      }
    }

    if (empId) {
      const employer: Employer = await this.employerService.findById(empId);
      updated = { ...updated, employer };
    }

    try {
      return await this.repository.save(updated);
    } catch (e) {
      throw serverErrorException(e);
    }
  }

  // * DELETE
  async findByIdAndDelete(id: string): Promise<Employee> {
    const employeeToDelete = await this.findById(id);

    try {
      return await this.repository.remove(employeeToDelete);
    } catch (e) {
      throw serverErrorException(e);
    }
  }
}
