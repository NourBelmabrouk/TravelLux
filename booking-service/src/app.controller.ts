import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LokiLogger } from 'nestjs-loki-logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly lokiLogger = new LokiLogger(AppController.name);   // adds context label

  @Get()
  getHello(): string {

    this.lokiLogger.debug('this is how we rock');
    this.lokiLogger.debug('this is how we rock', undefined, {
      label: 'testing', // you can set specifc labels to the log
    });

    return this.appService.getHello();
  }
}
