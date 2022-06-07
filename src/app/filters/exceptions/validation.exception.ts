import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

// Кастомный интерфейс респонса ошибки валидации
export interface IResponseValidationError {
  property: string;
  errors: string[];
  nested?: IResponseValidationError[];
}

// Метод преобразования стандартной ValidationError из class-validator в более удобный формат
export const mapError = (error: ValidationError): IResponseValidationError => ({
  property: error.property,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: error.constraints as unknown as string[],
  nested: error.children.map(mapError)
});

// Класс ошибки валидации
export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      errors.map(mapError),
      400
    );
  }
}
