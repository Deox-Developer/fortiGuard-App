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

-- AddForeignKey
ALTER TABLE "RoleHashPermission" ADD CONSTRAINT "RoleHashPermission_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "Role"("idRole") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleHashPermission" ADD CONSTRAINT "RoleHashPermission_idPermission_fkey" FOREIGN KEY ("idPermission") REFERENCES "Permission"("idPermission") ON DELETE RESTRICT ON UPDATE CASCADE;
