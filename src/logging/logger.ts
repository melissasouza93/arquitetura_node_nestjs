import { logging } from '@bradesco/ensc-lib-cloudjs-logging';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export class BaseLogger implements LoggerService {
  constructor(private readonly logger: logging.Logger) {
    // nothing ...
  }

  log(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onInfo(), message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onFatal(), message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onError(), message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onWarn(), message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onDebug(), message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.innerLog(this.logger.onTrace(), message, ...optionalParams);
  }

  private innerLog(
    emitter: logging.LogEmitter,
    message: any,
    ...optionalParams: any[]
  ) {
    const error = optionalParams.find((param) => param instanceof Error);
    emitter.setError(error).emit(message);
  }
}

@Injectable()
export class GlobalLogger extends BaseLogger {
  constructor() {
    super(logging.getLoggerFactory().getLogger());
  }
}

@Injectable()
export class RequestLogger extends BaseLogger {
  constructor(@Inject(REQUEST) request: Request) {
    super(request.log);
  }
}
