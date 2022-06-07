import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('REQUEST');

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(
        tap(() => this.logger.verbose(this.getMessage({ ctx }))),
      );
  }

  getMessage({ ctx }: { ctx: ExecutionContext }): string {
    const req: FastifyRequest = ctx.switchToHttp().getRequest();
    const res: FastifyReply = ctx.switchToHttp().getResponse();
    return `${res.statusCode} (${res.getResponseTime()} sec): ${req.url}`;
  }
}
