import type { ErrorType } from "./@type";

export function alreadyExists(message: string = 'Already Exist'): ErrorType {
  return {
    statusCode: 409,
    message,
  }
}