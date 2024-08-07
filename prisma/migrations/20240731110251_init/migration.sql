/*
  Warnings:

  - You are about to drop the `Process_Mas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Process_Mas" DROP CONSTRAINT "Process_Mas_InsertedById_fkey";

-- DropTable
DROP TABLE "Process_Mas";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "USER_MAS" (
    "SEQ_NO" SERIAL NOT NULL,
    "USER_EMAIL" TEXT NOT NULL,
    "FIRST_NAME" TEXT NOT NULL,
    "MIDDLE_NAME" TEXT,
    "LAST_NAME" TEXT,
    "FULL_NAME" TEXT,
    "PASSWORD" TEXT NOT NULL,
    "ROLES" "Roles" NOT NULL,
    "CREATE_AT" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "UPDATE_AT" TIMESTAMP(3),

    CONSTRAINT "USER_MAS_pkey" PRIMARY KEY ("SEQ_NO")
);

-- CreateTable
CREATE TABLE "PROCESS_MAS" (
    "SEQ_NO" SERIAL NOT NULL,
    "PROCE_NAME" TEXT NOT NULL,
    "PROCE_CODE" TEXT,
    "COMP_SEQ" INTEGER NOT NULL,
    "CREATE_AT" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "UPDATE_AT" TIMESTAMP(3),
    "INSERT_BY_SEQ" INTEGER,

    CONSTRAINT "PROCESS_MAS_pkey" PRIMARY KEY ("SEQ_NO")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_MAS_USER_EMAIL_key" ON "USER_MAS"("USER_EMAIL");

-- CreateIndex
CREATE UNIQUE INDEX "PROCESS_MAS_PROCE_NAME_key" ON "PROCESS_MAS"("PROCE_NAME");

-- AddForeignKey
ALTER TABLE "PROCESS_MAS" ADD CONSTRAINT "PROCESS_MAS_INSERT_BY_SEQ_fkey" FOREIGN KEY ("INSERT_BY_SEQ") REFERENCES "USER_MAS"("SEQ_NO") ON DELETE SET NULL ON UPDATE CASCADE;
