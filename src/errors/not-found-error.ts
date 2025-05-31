import type { ErrorType } from "./@type";

export function NotFoundError(message: string = 'Not Found'): ErrorType {
  return {
    statusCode: 400,
    message,
  }
}