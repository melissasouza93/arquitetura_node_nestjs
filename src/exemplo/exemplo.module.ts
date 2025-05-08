import { Module } from '@nestjs/common';
import { ExemploController } from './exemplo.controller';
import { ExemploService } from './exemplo.service';
import { ExemploGateway } from './exemplo.gateway';
import { HttpModule } from '@nestjs/axios';

@Module({
  // Importando o HttpModule para permitir chamadas HTTP
  // Import necessário para o funcionamento do ExemploService
  // e do ExemploGateway, que fazem uso de chamadas HTTP
  // para interagir com APIs externas.
  // O HttpModule é parte do pacote @nestjs/axios
  imports: [HttpModule],
  controllers: [ExemploController],
  providers: [ExemploService, ExemploGateway],
})
export class ExemploModule {}
