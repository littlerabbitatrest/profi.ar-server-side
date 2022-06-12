/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-parens */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { ExceptionFilter, ArgumentsHost, Logger, Catch, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { IExceptionResponse, IResponseValidationError, ValidationException } from '@app/filters/exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('REQUEST');

  catch(exception: unknown, host: ArgumentsHost): void {
    // Получаем общие данные о запросе
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();

    // Получаем данные о виде ошибки
    const httpStatus: number = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let response: IExceptionResponse = null;

    switch (true) {
    // Непредвиденная серверная ошибка, критическая ошибка в логике или ошибка в запросе на сторонний сервис
      case httpStatus === HttpStatus.INTERNAL_SERVER_ERROR: {
        response = this.internalServerErrorLogger(exception, httpStatus, req.url, req.method);
        break;
      }
      // Ошибка валидации (400, но она не относится к HttpException, поскольку её прокидывает class-validator, поэтому эту ошибку пришлось прогнать через свою фабрику в удобный вид)
      case exception instanceof ValidationException: {
        response = this.validationExceptionLogger(exception as ValidationException, httpStatus, req.url, req.method);
        break;
      }
      // Серверная ошибка NOT_FOUND 404 (мы её не выбрасываем сами, она бросается исключительно сервером)
      case exception instanceof NotFoundException: {
        response = this.notFoundErrorLogger(exception as NotFoundException, httpStatus, req.url, req.method);
        break;
      }
      // Любая нами же созданная ошибка (400, 401, 403)
      case exception instanceof HttpException: {
        response = this.clientErrorLogger(exception as HttpException, httpStatus, req.url, req.method);
        break;
      }
      default: {
        response = { message: 'неопознанная ебала' };
        break;
      }
    }

    res
      .status(httpStatus)
      .send(response);
  }

  // Метод обработки непредвиденных ошибок и ошибок сервера
  private internalServerErrorLogger(exception: any, httpStatus: number, url: string, method: string): IExceptionResponse {
    // Тут я парсю стек на то, что будет нормально выглядеть в консоли (вроде стек есть у любой ошибки, откуда бы она не упала)
    const parsedStack = this.parseStack(exception.stack);

    // Тут "очень красиво" логгирую ошибочку (вроде name & message тоже есть в любой ошибке, но могу быть не прав)
    this.logger.error(`${httpStatus}: ${method} ${url}\nERROR TYPE: ${exception.name}\nERROR MESSAGE: ${exception.message}\nERROR STACK:\n${parsedStack}\n`);

    // Тут я вывожу все данные о неизвестной ошибки напрямую в консоль (лучше способа не нашёл, ошибки тут самые разные могут прийти)
    const { response } = exception;
    console.log('RESPONSE:');
    console.log(response);

    // Тут я возвращаю то, что хочу передать на фронт
    return { message: 'Непредвиденная ошибка сервера. Мы уже трудимся над её устранением! :)' };
  }

  // Метод обработки ошибки валидации
  private validationExceptionLogger(exception: ValidationException, httpStatus: number, url: string, method: string): IExceptionResponse {
    // Тут я парсю стек на то, что будет нормально выглядеть в консоли
    const parsedStack = this.parseStack(exception.stack);

    // Тут я преобразовываю объект ошибки (что неправильно валидируется и почему)
    const response: IResponseValidationError[] = exception.getResponse() as IResponseValidationError[];
    const data = response.map(
      r => `PROPERTY: '${r.property}'\n${JSON.stringify(r.errors)
        .replace('{', '  ')
        .replace('}', '')
        .replace(',', '\n  ')}`
    ).join(`\n`);

    // Тут "очень красиво" логгирую ошибочку
    this.logger.error(`${httpStatus}: ${method} ${url}\nERROR TYPE: ${exception.name}\nERROR MESSAGE: ${exception.message}\nERROR STACK:\n${parsedStack}\nERROR RESPONSE:\n${data}`);

    // Тут возвращаю то, что хочу передать на фронт
    return { message: 'Неправильно заполнены данные' };
  }

  // Метод обработки NOT FOUND ошибки
  private notFoundErrorLogger(exception: NotFoundException, httpStatus: number, url: string, method: string): IExceptionResponse {
    // Тут я парсю стек на то, что будет нормально выглядеть в консоли
    const parsedStack = this.parseStack(exception.stack);

    // Тут я получаю дату персонально для 404 ошибки (она вроде всегда одинаковая)
    const response = exception.getResponse();
    const data = JSON.stringify(response)
      .replace('{', '  ')
      .replace('}', '')
      .replace(',', '\n  ');

    // Тут "очень красиво" логгирую ошибочку
    this.logger.error(`${httpStatus}: ${method} ${url}\nERROR TYPE: ${exception.name}\nERROR MESSAGE: ${exception.message}\nERROR STACK:\n${parsedStack}\nERROR RESPONSE:\n${data}`);

    // Тут я возвращаю на фронт инфу о том, шо не нашлось. Но возможно лучше сказать "Роут не найден" или типа того по аналогии с другими ошибками
    return { message: exception.message };
  }

  // Метод обработки ошибок 400, 401, 403, которые мы же сами и отловили
  private clientErrorLogger(exception: HttpException, httpStatus: number, url: string, method: string): IExceptionResponse {
    // Тут я парсю стек на то, что будет нормально выглядеть в консоли
    const parsedStack = this.parseStack(exception.stack);

    // Тут "очень красиво" логгирую ошибочку
    this.logger.error(`${httpStatus}: ${method} ${url}\nERROR TYPE: ${exception.name}\nERROR MESSAGE: ${exception.message}\nERROR STACK:\n${parsedStack}\n`);

    // Тут я пробрасываю то, что написано нами же где-то в сервисе или контроллере
    return { message: exception.message };
  }

  // Метод парсинга стека (везде вроде идентично)
  private parseStack(stack: string): string {
    const result = stack.split(`\n`);
    result.shift();
    return result.join(`\n`);
  }
}
