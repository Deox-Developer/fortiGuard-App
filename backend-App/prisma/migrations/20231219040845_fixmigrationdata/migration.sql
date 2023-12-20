-- CreateTable
CREATE TABLE "Account" (
    "idAccount" SERIAL NOT NULL,
    "nameAccount" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusAccount" BOOLEAN NOT NULL DEFAULT true,
    "roleAccount" INTEGER NOT NULL,
    "idPerson" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("idAccount")
);

-- CreateTable
CREATE TABLE "Person" (
    "idPerson" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "lastNames" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idIdentification" INTEGER NOT NULL,
    "numIdentification" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("idPerson")
);

-- CreateTable
CREATE TABLE "TypeIdentification" (
    "idTypeIdentification" SERIAL NOT NULL,
    "nameIdentification" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusTypeIdentification" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TypeIdentification_pkey" PRIMARY KEY ("idTypeIdentification")
);

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

-- CreateTable
CREATE TABLE "RoleHashPermission" (
    "idRoleHashPermission" SERIAL NOT NULL,
    "idRole" INTEGER NOT NULL,
    "idPermission" INTEGER NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusRoleHashPermission" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RoleHashPermission_pkey" PRIMARY KEY ("idRoleHashPermission")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_nameAccount_key" ON "Account"("nameAccount");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Person_numIdentification_key" ON "Person"("numIdentification");

-- CreateIndex
CREATE UNIQUE INDEX "TypeIdentification_nameIdentification_key" ON "TypeIdentification"("nameIdentification");

-- CreateIndex
CREATE UNIQUE INDEX "Role_nameRole_key" ON "Role"("nameRole");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_namePermission_key" ON "Permission"("namePermission");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_endPoint_key" ON "Permission"("endPoint");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_idPerson_fkey" FOREIGN KEY ("idPerson") REFERENCES "Person"("idPerson") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_roleAccount_fkey" FOREIGN KEY ("roleAccount") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_idIdentification_fkey" FOREIGN KEY ("idIdentification") REFERENCES "TypeIdentification"("idTypeIdentification") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHashPermission" ADD CONSTRAINT "RoleHashPermission_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHashPermission" ADD CONSTRAINT "RoleHashPermission_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;
