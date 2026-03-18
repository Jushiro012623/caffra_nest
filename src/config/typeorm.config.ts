import {registerAs} from "@nestjs/config";
import 'dotenv/config';
import {DataSourceOptions} from "typeorm";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {User} from "@app/user/entities/user.entity";

const env: Record<string, string | undefined> = process.env;

export const databaseSource = (): DataSourceOptions => {
    const port: number = Number(env.DB_PORT);

    return {
        type: 'mysql',
        host: env.DB_HOST || 'localhost',
        port: Number.isNaN(port) ? 3306 : port,
        username: env.DB_USERNAME || 'root',
        password: env.DB_PASSWORD || '',
        database: env.DB_NAME || 'nestjs',
        synchronize: false,
        migrationsRun: false,
        entities: [User],
        migrations: ['dist/typeorm/migration/*.js'],
    }
}

export const typeormConfig = registerAs('database', (): TypeOrmModuleOptions => (databaseSource()))