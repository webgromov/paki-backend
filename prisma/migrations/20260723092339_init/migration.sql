-- CreateEnum
CREATE TYPE "AuthorRole" AS ENUM ('CLIENT', 'OPERATOR');

-- CreateTable
CREATE TABLE "Dialog" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "dialogId" TEXT NOT NULL,
    "authorRole" "AuthorRole" NOT NULL,
    "authorName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dialog_updatedAt_idx" ON "Dialog"("updatedAt");

-- CreateIndex
CREATE INDEX "Message_dialogId_createdAt_idx" ON "Message"("dialogId", "createdAt");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
