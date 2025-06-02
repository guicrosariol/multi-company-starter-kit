/*
  Warnings:

  - Added the required column `count_user` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_user` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "count_user" INTEGER NOT NULL,
ADD COLUMN     "max_user" INTEGER NOT NULL;
