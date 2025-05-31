import type { ErrorType } from "./@type";

export function AlreadyExist(message: string = 'Already Exist'): ErrorType {
  return {
    statusCode: 409,
    message,
  }
}