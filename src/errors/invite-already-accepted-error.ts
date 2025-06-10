import type { ErrorType } from "./@type";

export function inviteAlreadyAcceptedError(message: string = 'Invite has already been accepted!'): ErrorType {
  return {
    statusCode: 400,
    message,
  }
}