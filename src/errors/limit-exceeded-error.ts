import type { ErrorType } from "./@type";

export function limitExceededError(message: string = 'Your plan’s limit has been exceeded'): ErrorType {
  return {
    statusCode: 403,
    message,
  }
}