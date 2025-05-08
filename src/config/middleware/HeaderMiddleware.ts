import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl } = req;

    try {
      if (!originalUrl.includes('/health')) {
        const authorization = req.headers.authorization as string;
        const xTihLegacyOpen = req.headers['x-tih-legacy-open'] as string;
        const xTihLegacyClosed = req.headers['x-tih-legacy-closed'] as string;

        req.headers = HeaderMiddleware.preencherHeaders(
          authorization,
          xTihLegacyOpen,
          xTihLegacyClosed,
        );
      }
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({
        erroCode: 'XSD0001',
        message: 'Headers inválidos',
        status: 400,
      });
    }

    next();
  }

  public static extractBearerTokenInfo(authorization: string): any {
    if (!authorization || typeof authorization !== 'string') {
      throw new Error('Invalid authorization header');
    }
    const payload = authorization.split('.')[1];
    const paddedPayload = payload.padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      '=',
    );
    const decodedPayload = Buffer.from(paddedPayload, 'base64').toString(
      'utf-8',
    );
    return JSON.parse(decodedPayload);
  }

  public static preencherHeaders(
    authorization,
    xTihLegacyOpen,
    xTihLegacyClosed,
  ) {
    const tokenInfo = this.extractBearerTokenInfo(authorization);
    const options = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authorization,
      'x-tih-legacy-open': xTihLegacyOpen,
      'x-tih-legacy-closed': xTihLegacyClosed,
      User: tokenInfo.frwk.usuario,
    };

    return options;
  }
}
