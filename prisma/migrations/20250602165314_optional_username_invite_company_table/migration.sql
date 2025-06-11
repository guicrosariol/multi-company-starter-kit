-- DropForeignKey
ALTER TABLE "invites_companies" DROP CONSTRAINT "invites_companies_username_fkey";

-- AlterTable
ALTER TABLE "invites_companies" ALTER COLUMN "username" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invites_companies" ADD CONSTRAINT "invites_companies_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;
