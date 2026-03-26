import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

type LogMeta = Record<string, unknown> | string | number | boolean | Error;

@Injectable({ scope: Scope.TRANSIENT })
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

    return `${msg} | ${meta.map((item) => this.stringify(item)).join(' ')}`;
  }

  private stringify(value: unknown): string {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    if (value instanceof Error) return value.stack || value.message;
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return '[Unserializable object]';
      }
    }
    if (typeof value === 'symbol') return value.toString();
    if (typeof value === 'function') return value.name || '[Function]';

    return '[Unknown value]';
  }
}
