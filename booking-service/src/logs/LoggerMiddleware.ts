import { LokiLogger } from 'nestjs-loki-logger';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger 
    constructor(
      ControllerName: string
    ){
        this.logger = new LokiLogger(ControllerName);
    }
  
  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const correlationKey = uuidv4();

 

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      if (statusCode == 401 ){
        this.logger.error(
          `ERROR - ID:[${correlationKey}] -method: ${method} -statusCode: ${statusCode} -originalUrl: ${originalUrl}  -userAgent: ${userAgent} -IP: ${ip}: ${contentLength}: - USER NOT AUTHORIZED
          `,
        );
      }
      else if (statusCode == 404 ){
        this.logger.error(
          `ERROR - ID:[${correlationKey}] -method:${method} -statusCode: ${statusCode}  -originalUrl: ${originalUrl}  -userAgent: ${userAgent} -IP: ${ip}: ${contentLength}: - PAGE NOT FOUND
          `,
        );

      }
      else if (statusCode == 400 ){
        this.logger.error(
          `ERROR - ID:[${correlationKey}] -method: ${method}  -statusCode: ${statusCode} -originalUrl: ${originalUrl}  -userAgent: ${userAgent} -IP: ${ip}: ${contentLength}: - BAD REQUEST 
          `,
        );

      }
      else if (statusCode == 200 ) {
        this.logger.log(
          `LOG - ID:[${correlationKey}] -method: ${method}  -statusCode: ${statusCode} -originalUrl: ${originalUrl}  -userAgent: ${userAgent} -IP: ${ip}: ${contentLength}: 
          `,
        );

      }
      else {
        this.logger.debug(
          `DEBUG - ID:[${correlationKey}] -method: ${method}  -statusCode: ${statusCode} -originalUrl: ${originalUrl}  -userAgent: ${userAgent} -IP: ${ip}: ${contentLength}: 
          `,
        );

      }
    });

    next();
  }
}