import {registerAs} from '@nestjs/config';

type AppEnv = 'local' | 'staging' | 'production';

type AppConfig = {
    env: AppEnv;
    name: string;
    port: number;
};

export const appConfig = registerAs('app', (): AppConfig => {
    const env: AppEnv = process.env.APP_ENV as AppConfig['env'];
    const port: number = Number(process.env.APP_PORT);

    return {
        env: ['local', 'staging', 'production'].includes(env) ? env : 'local',
        name: process.env.APP_NAME || 'Caffra',
        port: Number.isNaN(port) ? 8000 : port,
    };
});