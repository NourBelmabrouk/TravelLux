import { LokiLogger } from 'nestjs-loki-logger';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { v4 as uuidv4 } from 'uuid';
import { LogsService } from './logs.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
  private readonly lokiLogger = new LokiLogger(LoggingInterceptor.name);   // adds context label
private logService
  constructor(
  ){
    this.logService = new LogsService();
    
  }
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      if (context.getType() === 'http') {
        return this.logHttpCall(context, next);
      }
    }
  
    private logHttpCall(context: ExecutionContext, next: CallHandler) {
      const request = context.switchToHttp().getRequest();
      const userAgent = request.get('user-agent') || '';
      const { ip, method, path: url } = request;
      const correlationKey = uuidv4();
      const userId = request.user?.userId;
  
      this.lokiLogger.log(
        `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${
          context.getClass().name
        } ${context.getHandler().name}`,
      );
  
      const now = Date.now();
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
  
          const { statusCode } = response;
          const contentLength = response.get('content-length');
  
          if (statusCode == 401 ){
            this.lokiLogger.error(
              `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${
                Date.now() - now
              }ms - USER NOT AUTHORIZED `,
            );
          }
          else if (statusCode == 404 ) {

            this.lokiLogger.error(
              `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${
                Date.now() - now 
              }ms - PAGE NOT FOUND`,
            );

          }
          else if (statusCode == 200 ) {
            this.lokiLogger.log(
              `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${
                Date.now() - now
              }ms - STATUS GOOD `,
            );
          }
         
        }),
      );
    }
  }