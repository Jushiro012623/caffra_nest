import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { appConfig } from '@app/config';
import { useContainer } from 'class-validator';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const { port } = appConfig();
  await app.listen(port);
}

bootstrap().catch(() => {
  Logger.log('Error Bootstrapping server', 'Main');
  process.exit(1);
});
