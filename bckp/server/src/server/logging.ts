import { config } from './config';

interface LogData {
    method: string;
    url: string;
    query: string;
    remoteAddress: string;
    host: string;
    userAgent: string;
    statusCode: number;
    errorMessage: string;
    errorStack: string;
    data: unknown;
    responseTime: number;
}


function outputLog(data: Partial<LogData>, thrownError: unknown) {
    if (config.prettyLog) {
      console.log(`${data.statusCode} ${data.method} ${data.url} - ${data.responseTime}ms`);

      if (thrownError) {
          console.error(thrownError);
      }
    } else if (data.statusCode && data.statusCode < 400) {
        process.stdout.write(JSON.stringify(data) + '\n');
    } else {
        process.stderr.write(JSON.stringify(data) + '\n');
    }
}

interface LogContext {
  status: number;
  method: string;
  url: string;
  querystring: string;
  request: {
    ip: string;
  };
  headers: Record<string, string>;
}


export async function logger(ctx: LogContext, next: () => Promise<unknown>): Promise<void> {
    const start = new Date().getMilliseconds();
    const logData: Partial<LogData> = {
        method: ctx.method,
        url: ctx.url,
        query: ctx.querystring,
        remoteAddress: ctx.request.ip,
        host: ctx.headers['host'],
        userAgent: ctx.headers['user-agent'],
    };

    let errorThrown: Error | null = null;

    try {
        await next();
        logData.statusCode = ctx.status;
    } catch (e) {
        errorThrown = e;
        logData.errorMessage = e.message;
        logData.errorStack = e.stack;
        logData.statusCode = e.status || 500;

        if (e.data) {
            logData.data = e.data;
        }
    }

    logData.responseTime = new Date().getMilliseconds() - start;
    outputLog(logData, errorThrown);

    if (errorThrown) {
        throw errorThrown;
    }
}
