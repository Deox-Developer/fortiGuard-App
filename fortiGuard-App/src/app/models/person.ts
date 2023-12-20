import { Account } from "./account";
import { TypeIdentification} from "./type-identification"

export interface Person {
    idPerson: number;
    names: string;
    lastNames: string;
    createDate: string;
    updateDate: string;
    idIdentification: number;
    numIdentification: string;
    account: Account[];
    phone: number;
    typeIdentification: TypeIdentification;
  }