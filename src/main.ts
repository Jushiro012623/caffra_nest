import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { appConfig } from '@app/config';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { LoggerService } from '@app/common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(new LoggerService());

  const { port } = appConfig();
  await app.listen(port);
}

bootstrap().catch(() => {
  Logger.log('Error Bootstrapping server', 'Main');
  process.exit(1);
});
