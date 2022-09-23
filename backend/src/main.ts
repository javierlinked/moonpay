import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppModule } from './app.module';

const port = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port);
}
bootstrap();
