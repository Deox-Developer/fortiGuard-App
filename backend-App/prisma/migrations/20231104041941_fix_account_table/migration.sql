-- CreateTable
CREATE TABLE "Account" (
    "idAccount" SERIAL NOT NULL,
    "nameAccount" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusAccount" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("idAccount")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_nameAccount_key" ON "Account"("nameAccount");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");
