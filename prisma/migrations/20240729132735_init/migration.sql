-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "Roles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process_Mas" (
    "id" SERIAL NOT NULL,
    "Proc_Name" TEXT NOT NULL,
    "Proc_Code" TEXT NOT NULL,
    "Comp_Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "InsertedById" INTEGER NOT NULL,

    CONSTRAINT "Process_Mas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Process_Mas_InsertedById_key" ON "Process_Mas"("InsertedById");

-- AddForeignKey
ALTER TABLE "Process_Mas" ADD CONSTRAINT "Process_Mas_InsertedById_fkey" FOREIGN KEY ("InsertedById") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
