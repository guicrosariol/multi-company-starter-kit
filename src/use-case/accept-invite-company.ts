interface AcceptInviteCompanyRequest {
  inviteId?: string
  userId: string
  companyId: string
}

type AcceptInviteCompanyResponse = any

export class AcceptInviteCompanyUseCase {
  execute({
    inviteId,
    companyId,
    userId
  }: AcceptInviteCompanyRequest): AcceptInviteCompanyResponse {

  }
}