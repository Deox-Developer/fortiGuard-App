/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "phone" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Person_phone_key" ON "Person"("phone");
