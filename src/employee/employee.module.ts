import { Module } from '@nestjs/common';
import { AppController } from './employee.controller';
import { AppService } from './employee.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
