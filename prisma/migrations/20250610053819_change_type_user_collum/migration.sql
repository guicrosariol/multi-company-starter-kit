/*
  Warnings:

  - You are about to alter the column `count_companies` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `max_companies` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "count_companies" SET DEFAULT 0,
ALTER COLUMN "count_companies" SET DATA TYPE INTEGER,
ALTER COLUMN "max_companies" SET DEFAULT 0,
ALTER COLUMN "max_companies" SET DATA TYPE INTEGER;
