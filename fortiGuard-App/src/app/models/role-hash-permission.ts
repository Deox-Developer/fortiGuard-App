import { Permission } from "./permission";
import { Role } from "./role";

export interface RoleHashPermission {
    idRoleHashPermission: number;
    idRole: number;
    idPermission: number;
    createDate: string;
    updateData: string;
    statusRoleHashPermission: boolean;
    permission: Permission;
    role: Role;
}
