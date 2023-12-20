import {RoleHashPermission} from "./role-hash-permission"
import { Account } from "./account";

export interface Role {
    idRole: number;
    nameRole: string;
    createDate: string;
    updateData: string;
    statusRol: boolean;
    account: Account[];
    roleHashPermission: RoleHashPermission[];
  }