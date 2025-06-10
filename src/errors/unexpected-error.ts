import type { ErrorType } from "./@type";

export function unexpectedError(message: string = 'Unexpected error'): ErrorType {
  return {
    statusCode: 400,
    message,
  }
}