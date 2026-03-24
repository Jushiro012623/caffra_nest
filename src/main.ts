import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { appConfig } from '@app/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port } = appConfig();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(port, () => {
    console.log(`Hola! El servidor se está ejecutando en el puerto ${port}`);
  });


}

bootstrap()
