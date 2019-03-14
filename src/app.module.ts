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
import { trim } from './middleware/trim.middleware';

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
      .apply(trim)
      .forRoutes(
        { path: 'api/employee', method: RequestMethod.POST },
        { path: 'api/employee', method: RequestMethod.PUT },
      );

    consumer
      .apply(trim)
      .forRoutes(
        { path: 'api/employer', method: RequestMethod.POST },
        { path: 'api/employer', method: RequestMethod.PUT },
      );
  }
}
