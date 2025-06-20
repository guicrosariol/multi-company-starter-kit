import type { ErrorType } from "./@type";

export function userAlreadyHasAccessError(message: string = 'This user already has access'): ErrorType {
  return {
    statusCode: 409,
    message,
  }
}