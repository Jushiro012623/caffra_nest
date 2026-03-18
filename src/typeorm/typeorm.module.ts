import {Module} from '@nestjs/common';
import {TypeOrmModule as TOM} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {createTypeOrmOptions} from "./typeorm.config";

@Module({
    imports: [
        TOM.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) =>
                createTypeOrmOptions({
                    DB_HOST: config.get<string>('DB_HOST'),
                    DB_PORT: config.get<string>('DB_PORT'),
                    DB_USERNAME: config.get<string>('DB_USERNAME'),
                    DB_PASSWORD: config.get<string>('DB_PASSWORD'),
                    DB_NAME: config.get<string>('DB_NAME'),
                }),
        })
    ]
})
export class TypeOrmModule {
}

