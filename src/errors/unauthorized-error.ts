import type { ErrorType } from "./@type";

export function unauthorizedError(message: string = 'Unauthorized'): ErrorType {
  return {
    statusCode: 401,
    message,
  }
}