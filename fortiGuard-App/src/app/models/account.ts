import { Person } from "./person";
import { Role } from "./role";

export interface Account {
    idAccount: number;
    nameAccount: string;
    email: string;
    password: string;
    createDate: string;
    updateData: string;
    statusAccount: boolean;
    roleAccount: number;
    idPerson: number;
    person: Person;
    role: Role;
  }