/*
  Warnings:

  - A unique constraint covering the columns `[Proc_Name]` on the table `Process_Mas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Process_Mas" DROP CONSTRAINT "Process_Mas_InsertedById_fkey";

-- DropIndex
DROP INDEX "Process_Mas_InsertedById_key";

-- AlterTable
ALTER TABLE "Process_Mas" ALTER COLUMN "Proc_Code" DROP NOT NULL,
ALTER COLUMN "InsertedById" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Process_Mas_Proc_Name_key" ON "Process_Mas"("Proc_Name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- AddForeignKey
ALTER TABLE "Process_Mas" ADD CONSTRAINT "Process_Mas_InsertedById_fkey" FOREIGN KEY ("InsertedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
