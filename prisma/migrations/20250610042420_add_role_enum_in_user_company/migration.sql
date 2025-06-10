/*
  Warnings:

  - You are about to drop the column `ownerId` on the `companies` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user_companies` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin');

-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_ownerId_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "ownerId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_companies" ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
