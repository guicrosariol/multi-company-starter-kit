/*
  Warnings:

  - A unique constraint covering the columns `[username,companyId]` on the table `invites_companies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,companyId]` on the table `user_companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invites_companies_username_companyId_key" ON "invites_companies"("username", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "user_companies_userId_companyId_key" ON "user_companies"("userId", "companyId");
