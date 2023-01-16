import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initTracing } from './tracer/tracer';
//import sdk from './tracer/tracer';

async function bootstrap() {
  //await sdk.start()
  await initTracing()
  const app = await NestFactory.create(AppModule);
  await app.listen(3050);
}
bootstrap();
