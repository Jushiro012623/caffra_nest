import {NestFactory} from '@nestjs/core';
import {AppModule} from '@app/app.module';
import {ValidationPipe} from '@nestjs/common';
import {AppConfig, appConfig} from '@app/config';
import {useContainer} from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const {port} = appConfig();

    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe());

    useContainer(app.select(AppModule), {fallbackOnErrors: true});

    await app.listen(port);

}

bootstrap()
    .then(() => console.log(`Server is now running`))
    .catch((err: unknown) => {
        console.error('Error during bootstrap', err);
        process.exit(1);
    });
