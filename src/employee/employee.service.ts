import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeDto } from './employee.dto';
import { employeeErrors, generalErrors } from 'src/shared';
import { EmployerService } from 'src/employer/employer.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly repository: Repository<Employee>,
    private readonly employerService: EmployerService,
  ) {}

  // * POST
  async createOrFail(employeeDto: EmployeeDto): Promise<Employee> {
    // Check if VAT already exists
    const { vat } = employeeDto;
    const duplicate = await this.repository.findOne({ vat });
    if (duplicate) {
      throw new HttpException(
        generalErrors.VAT_MUST_BE_UNIQUE,
        HttpStatus.BAD_REQUEST,
      );
    }
    // Get employer
    const employer = await this.employerService.findByIdOrFail(
      employeeDto.employerId,
    );
    // Combine dto with employer
    const employeeToCreate = { ...employeeDto, employer };
    // save to db
    return await this.repository.save(employeeToCreate);
  }

  // * GET
  async findAllOrFail(): Promise<Employee[]> {
    const employees = await this.repository.find();
    if (employees.length === 0) {
      throw new HttpException(
        employeeErrors.EMPTY_EMPLOYEE_LIST,
        HttpStatus.NOT_FOUND,
      );
    }
    return employees;
  }

  async findByIdOrFail(id: string): Promise<Employee> {
    const employee = await this.repository.findOne(id);
    if (!employee)
      throw new HttpException(employeeErrors.NOT_FOUND, HttpStatus.NOT_FOUND);

    return employee;
  }

  // * PUT
  async updateByIdOrFail(id: string, employeeDto: Partial<EmployeeDto>) {
    const employeeToUpdate = await this.findByIdOrFail(id);
    let updated: Employee = { ...employeeToUpdate, ...employeeDto };
    const { employerId, vat } = employeeDto;
    // Check if dto has vat and does not already exist in an other employee.
    if (vat) {
      const duplicate = await this.repository.findOne({ vat });
      if (duplicate && duplicate.id.toString() !== id) {
        throw new HttpException(
          generalErrors.VAT_MUST_BE_UNIQUE,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    // Check if dto has employerId, if so add to the updated the new employer.
    if (employerId) {
      const employer = await this.employerService.findByIdOrFail(employerId);
      updated = { ...updated, employer };
    }

    return await this.repository.save(updated);
  }

  // * DELETE
  async deleteByIdOrFail(id: string): Promise<Employee> {
    const employeeToDelete = await this.findByIdOrFail(id);
    if (!employeeToDelete)
      throw new HttpException(employeeErrors.NOT_FOUND, HttpStatus.NOT_FOUND);

    return await this.repository.remove(employeeToDelete);
  }
}
