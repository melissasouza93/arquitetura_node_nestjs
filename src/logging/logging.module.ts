import { Module } from '@nestjs/common';
import { GlobalLogger } from './logger';

@Module({
  providers: [GlobalLogger],
  exports: [GlobalLogger],
})
export class LoggingModule {}
