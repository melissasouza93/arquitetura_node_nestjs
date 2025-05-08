import { logging } from '@bradesco/ensc-lib-cloudjs-logging';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExemploGateway {
  private logger = logging.getLoggerFactory().getLogger();
  private baseUrl: string;

  public constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('URL_EXEMPLO') ?? '';
  }

  public async execute(headers: Record<string, string>): Promise<any> {
    this.logger.info('Chamada GravarClientePrimeGateway');

    return await firstValueFrom(
      this.httpService.post(this.baseUrl, {
        headers: headers,
      }),
    )
      .then(
        async (res) =>
          await new Promise<unknown>((resolve) => resolve(res.data)),
      )
      .catch(
        async (error) =>
          await new Promise<unknown>((_, reject) => {
            this.logger.error('Erro Gateway - ' + JSON.stringify(error));
            reject(new Error(JSON.stringify(error)));
          }),
      );
  }
}
