type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: string;
  message: string;
  data?: any;
}

export class Debug {
  private static logs: LogEntry[] = [];
  private static readonly MAX_LOGS = 100;

  private static formatTime(): string {
    return new Date().toISOString();
  }

  private static log(level: LogLevel, module: string, message: string, data?: any) {
    const entry: LogEntry = {
      timestamp: this.formatTime(),
      level,
      module,
      message,
      data
    };

    console[level](
      `[${entry.timestamp}] [${level.toUpperCase()}] [${module}]:`,
      message,
      data ? data : ''
    );

    this.logs.unshift(entry);
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }
  }

  static debug(module: string, message: string, data?: any) {
    this.log('debug', module, message, data);
  }

  static info(module: string, message: string, data?: any) {
    this.log('info', module, message, data);
  }

  static warn(module: string, message: string, data?: any) {
    this.log('warn', module, message, data);
  }

  static error(module: string, message: string, data?: any) {
    this.log('error', module, message, data);
  }

  static getLogs(): LogEntry[] {
    return [...this.logs];
  }
}