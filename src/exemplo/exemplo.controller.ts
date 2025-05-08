import { ExemploService } from './exemplo.service';
import { logging, business } from '@bradesco/ensc-lib-cloudjs-logging';
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('exemplo')
export class ExemploController {
  private readonly logger = logging.getLoggerFactory().getLogger();
  private readonly businessLogger = business
    .getBusinessLoggerFactory()
    .getLogger();

  constructor(private readonly service: ExemploService) {}

  @Get()
  async execute(@Headers() headers: Record<string, any>): Promise<any> {
    this.logRequest(headers);

    const response = await this.service.execute(headers);

    this.logResponse(response);

    return response;
  }

  private logRequest(headers: Record<string, any>): void {
    this.logger.info('Iniciando consulta aos cargos de funcionários.');
    this.businessLogger
      .log('INDEFINIDO')
      .input(`Headers: ${JSON.stringify(headers)}`)
      .transactionCode('ExemploController')
      .emit();
  }

  private logResponse(response: any): void {
    this.businessLogger
      .log('SUCESSO')
      .output(JSON.stringify(response))
      .transactionCode('ExemploController')
      .emit();
  }
}
