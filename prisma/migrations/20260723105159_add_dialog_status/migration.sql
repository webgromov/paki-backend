-- CreateEnum
CREATE TYPE "DialogStatus" AS ENUM ('OPEN', 'RESOLVED');

-- AlterTable
ALTER TABLE "Dialog" ADD COLUMN     "status" "DialogStatus" NOT NULL DEFAULT 'OPEN';
