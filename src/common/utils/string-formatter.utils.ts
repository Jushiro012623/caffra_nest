export class StringFormatter {
  static toSentenceCase(str: string) {
    if (!str) {
      return '';
    }

    const lowerStr = str.toLowerCase();

    return lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1);
  }

  static toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word: string): string => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  static mask(
    value: string,
    options?: {
      start?: number;
      end?: number;
      maskChar?: string;
    },
  ): string {
    if (!value) return '';

    const length: number = value.length;
    const maskChar: string = options?.maskChar ?? '*';

    if (!options) {
      return maskChar.repeat(length);
    }

    let start: number = options.start ?? 0;
    let end: number = options.end ?? length;

    if (end < 0) {
      end = length + end;
    }

    start = Math.max(0, start);
    end = Math.min(length, end);

    if (start >= end) return value;

    const maskedSection: string = maskChar.repeat(end - start);

    return value.slice(0, start) + maskedSection + value.slice(end);
  }
}
