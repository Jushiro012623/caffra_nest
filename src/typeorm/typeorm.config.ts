import {DataSourceOptions} from 'typeorm';

type Env = Record<string, string | undefined>;

export function createTypeOrmOptions(env: Env): DataSourceOptions {
    return {
        type: 'mysql',
        host: env.DB_HOST || 'localhost',
        port: Number(env.DB_PORT || 3306),
        username: env.DB_USERNAME || 'root',
        password: env.DB_PASSWORD || '',
        database: env.DB_NAME || 'nestjs',
        synchronize: false,
        migrationsRun: false,
        entities: ['dist/entities/*.js'],
        migrations: ['dist/typeorm/migration/*.js'],
    };
}