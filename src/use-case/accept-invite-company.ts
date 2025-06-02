interface AcceptInviteCompanyRequest {
  userId: string
  companyId: string
}

type AcceptInviteCompanyResponse = any

export class AcceptInviteCompanyUseCase {
  execute({ }: AcceptInviteCompanyRequest): AcceptInviteCompanyResponse {
    
  }
}