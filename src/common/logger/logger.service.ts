import {ConsoleLogger, Injectable} from '@nestjs/common';

type LogMeta = Record<string, unknown> | string | number | boolean | Error;

@Injectable()
export class LoggerService extends ConsoleLogger {
    log(message: unknown, ...optionalParams: unknown[]): void {
        const formatted = this.format(message, optionalParams as LogMeta[]);
        super.log(formatted);
    }

    warn(message: unknown, ...optionalParams: unknown[]): void {
        const formatted = this.format(message, optionalParams as LogMeta[]);
        super.warn(formatted);
    }


    private format(message: unknown, meta: LogMeta[]): string {
        const msg = this.stringify(message);

        if (!meta.length) return msg;

        return `${msg} | ${meta.map(this.stringify).join(' ')}`;
    }

    private stringify(value: LogMeta | unknown): string {
        if (typeof value === 'string') return value;
        if (value instanceof Error) return value.stack || value.message;
        if (typeof value === 'object') return JSON.stringify(value);
        return String(value);
    }
}