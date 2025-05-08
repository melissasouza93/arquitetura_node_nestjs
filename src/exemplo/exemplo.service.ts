import { Injectable } from '@nestjs/common';
import { ExemploGateway } from './exemplo.gateway';
import { logging } from '@bradesco/ensc-lib-cloudjs-logging';

@Injectable()
export class ExemploService {
  private logger = logging.getLoggerFactory().getLogger();

  public constructor(private readonly gateway: ExemploGateway) {}

  public async execute(headers: Record<string, string>): Promise<any> {
    this.logger.info('Chamada GravarClientePrimeService');
    return this.gateway.execute(headers);
  }
}
