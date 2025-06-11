-- AlterTable
ALTER TABLE "users" ADD COLUMN     "count_companies" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "max_companies" DECIMAL(65,30) NOT NULL DEFAULT 0;
