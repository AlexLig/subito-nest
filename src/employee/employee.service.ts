import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDto } from './employee.dto';
import {
  notFoundException,
  employeeErrors,
  duplicateException,
  generalErrors,
  serverErrorException,
  employerErrors,
} from 'src/shared';
import { Employer } from 'src/employer/employer.entity';
import { EmployerService } from 'src/employer/employer.service';
import { error500 } from 'src/shared/HttpExceptions';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
    private readonly employerService: EmployerService,
  ) {}

  // * POST
  async create(employeeDto: EmployeeDto): Promise<Employee> {
    // Get employer
    let employer: Employer;
    // employer = await this.employerService.findOne(employeeDto.employerId);
    // Combine dto with employer
    const employeeToCreate = { ...employeeDto, employer };
    // save to db
    try {
      return await this.repository.save(employeeToCreate);
    } catch (e) {
      throw serverErrorException(e);
    }
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    try {
      return await this.repository.find();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<Employee> {
    let employee: Employee;
    try {
      employee = await this.repository.findOne(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (!employee)
      throw new HttpException(employeeErrors.NOT_FOUND, HttpStatus.NOT_FOUND);

    return employee;
  }

  // * PUT
  async findByIdAndUpdate(id: string, employeeDto: Partial<EmployeeDto>) {
    const employeeToUpdate = await this.findById(id);
    let updated: Employee = { ...employeeToUpdate, ...employeeDto };

    const { employerId, vat } = employeeDto;

    if (vat) {
      const duplicate = await this.repository.findOne({ vat });
      if (duplicate && duplicate.id.toString() !== id) {
        throw duplicateException(generalErrors.VAT_MUST_BE_UNIQUE);
      }
    }

    if (employerId) {
      // const employer: Employer = await this.employerService.findById(empId);
      // updated = { ...updated, employer };
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
