import { createLoggingMiddleware } from '@bradesco/ensc-lib-cloudjs-logging/express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Usar o middleware da biblioteca de log.
    createLoggingMiddleware()(req, res, () => {});

    // Exemplo de um DataProvider usando o request
    req.log.use((attrBuilder) => {
      const bradId = req.header('x-bra-correlation-id');
      if (bradId) {
        attrBuilder.addAttribute(
          'http.request.header.x-bra-correlation-id',
          bradId,
        );
      }
    });

    req.log // Exemplo de um log de debug com as infos de request
      .onDebug()
      .addAllAttributes({
        'http.request.method': req.method,
        'http.request.url': req.url,
        'http.request.header.accept': req.header('accept'),
        'http.request.header.content-type': req.header('content-type'),
        'http.request.header.user-agent': req.header('user-agent'),
        'http.request.header.x-forwarded-for': req.header('x-forwarded-for'),
        'http.request.header.x-real-ip': req.header('x-real-ip'),
      })
      .emit();

    next();
  }
}
