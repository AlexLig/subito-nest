import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { EmployerService } from './employer/employer.service';
import { EmployerController } from './employer/employer.controller';
import { EmployerModule } from './employer/employer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { isDuplicateVat } from './middlewares';
import { repositories as r } from './shared';

@Module({
  imports: [EmployeeModule, EmployerModule, TypeOrmModule.forRoot()],
  // * To make a service injectable to other services, make it available by providing them here and at the module they are used.
  providers: [EmployerService],
  controllers: [EmployerController],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isDuplicateVat(r.EMPLOYEE))
      .forRoutes({ path: 'api/employee', method: RequestMethod.POST });

    consumer
      .apply(isDuplicateVat(r.EMPLOYER))
      .forRoutes({ path: 'api/employer', method: RequestMethod.POST });
  }
}
