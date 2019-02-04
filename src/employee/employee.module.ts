import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from 'src/employer/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Employer])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
