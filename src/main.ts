import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalLogger } from './logging/logger';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableShutdownHooks();

  const isProduction = config.get<string>('NODE_ENV') === 'PRD';

  if (isProduction) {
    app.useLogger(new GlobalLogger());
  }

  // Configuração do Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('projeto_teste_mudar_nome>') //TODO: mudar para o nome correto
    .setDescription('')
    .addTag('infra', process.env.SWAGGER_TAG_INFRA || 'cloud')
    .addTag('tipo-api', process.env.SWAGGER_TAG_TIPO_API || 'interna')
    .addTag('asset', process.env.SWAGGER_TAG_ASSET || 'CIAR') //TODO: mudar para o centroDeCusto correto
    .addServer(process.env.SERVER || 'http://localhost:8080', 'Servidor')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document);

  const port: number = parseInt(config.get<string>('PORT') || '8080', 10);
  const env: string = config.get<string>('NODE_ENV') || 'unknown';

  await app.listen(port, () => {
    Logger.log(`[NestBootstrap] Running in port: ${port}, mode: ${env}`);
  });
}
void bootstrap();
