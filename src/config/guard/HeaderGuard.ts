import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class HeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { originalUrl, headers } = request;

    if (
      !originalUrl.includes('/health') &&
      (!headers['x-tih-legacy-open'] ||
        !headers['x-tih-legacy-closed'] ||
        !headers['Authorization'])
    ) {
      throw new HttpException(
        {
          erroCode: 'XSD0001',
          message: 'XSD não informado ou inválido',
          status: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
