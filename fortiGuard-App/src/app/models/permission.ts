import { RoleHashPermission } from "./role-hash-permission";

export interface Permission {

    idPermission: number;
    namePermission: string;
    endPoint: string;
    createDate: string;
    updateData: string;
    statusPermission: boolean;
    roleHashPermission: RoleHashPermission[];
}

