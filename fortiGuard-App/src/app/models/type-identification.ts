import { Person } from "./person";
export interface TypeIdentification {
    idTypeIdentification: number;
    nameIdentification: string;
    createDate: string;
    updateDate: string;
    statusTypeIdentification: boolean;
    person: Person[];
  }