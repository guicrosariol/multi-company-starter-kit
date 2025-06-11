import type { ErrorType } from "./@type";

export function notFoundError(message: string = 'Not Found'): ErrorType {
  return {
    statusCode: 400,
    message,
  }
}