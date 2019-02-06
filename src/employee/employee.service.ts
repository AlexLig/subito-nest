import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import {
  notFoundException,
  employeeErrors,
  duplicateException,
} from 'src/shared';
import { Employer } from 'src/employer/employer.entity';
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly employerService: EmployerService,
  ) {}

  // * POST
  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const { employerId, vat } = employeeDto;

    const duplicate = await this.employeeRepository.findOne({ vat });
    if (duplicate) {
      throw duplicateException(employeeErrors.VAT_MUST_BE_UNIQUE);
    }

    const employer = await this.employerService.findById(employerId);
    const employeeToCreate = { ...employeeDto, employer };
    const newEmployee = await this.employeeRepository.create(employeeToCreate);

    try {
      return await this.employeeRepository.save(newEmployee);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * GET
  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
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
      const duplicate = await this.employeeRepository.findOne({ vat });
      if (duplicate && duplicate.id.toString() !== id) {
        throw duplicateException(employeeErrors.VAT_MUST_BE_UNIQUE);
      }
    }

    if (empId) {
      const employer: Employer = await this.employerService.findById(empId);
      updated = { ...updated, employer };
    }

    try {
      return await this.employeeRepository.save(updated);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * DELETE
  async findByIdAndDelete(id: string): Promise<Employee> {
    const employeeToDelete = await this.findById(id);

    try {
      return await this.employeeRepository.remove(employeeToDelete);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
