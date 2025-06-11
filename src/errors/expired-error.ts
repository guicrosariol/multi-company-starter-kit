import type { ErrorType } from "./@type";

export function expiredError(message: string = 'Invite has expired!'): ErrorType {
  return {
    statusCode: 410, 
    message,
  }
}