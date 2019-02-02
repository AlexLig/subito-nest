import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { EmployerService } from './employer/employer.service';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';

@Module({
  imports: [EmployeeModule, EmployerModule],
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class AppModule {}
