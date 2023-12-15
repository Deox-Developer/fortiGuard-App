/*
  Warnings:

  - Added the required column `roleAccount` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "roleAccount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "idRole" SERIAL NOT NULL,
    "nameRole" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusRol" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("idRole")
);

-- CreateTable
CREATE TABLE "Permission" (
    "idPermission" SERIAL NOT NULL,
    "namePermission" TEXT NOT NULL,
    "endPoint" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusPermission" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("idPermission")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_nameRole_key" ON "Role"("nameRole");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_namePermission_key" ON "Permission"("namePermission");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_endPoint_key" ON "Permission"("endPoint");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleAccount_fkey" FOREIGN KEY ("roleAccount") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;
