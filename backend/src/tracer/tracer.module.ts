import { Global, Module } from '@nestjs/common';
import { TracerController } from './tracer.controller';
import { TracerService } from './tracer.service';

@Global()
@Module({
  controllers: [TracerController],
  providers: [TracerService]
})
export class TracerModule {}
