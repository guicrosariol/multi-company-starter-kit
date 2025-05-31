-- CreateTable
CREATE TABLE "invites_companies" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "invites_companies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invites_companies" ADD CONSTRAINT "invites_companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites_companies" ADD CONSTRAINT "invites_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
