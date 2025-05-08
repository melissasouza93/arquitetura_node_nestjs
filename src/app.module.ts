import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingModule } from './logging/logging.module';
import { HealthModule } from './health/health.module';
import { HeaderMiddleware } from './config/middleware/HeaderMiddleware';
import { LoggerMiddleware } from './logging/middleware';
import { APP_GUARD } from '@nestjs/core';
import { HeaderGuard } from './config/guard/HeaderGuard';
import { ExemploModule } from './exemplo/exemplo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggingModule,
    HealthModule,
    ExemploModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: HeaderGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
