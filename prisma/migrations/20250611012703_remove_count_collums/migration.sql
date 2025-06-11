/*
  Warnings:

  - You are about to drop the column `count_user` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `count_companies` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "count_user";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "count_companies";
