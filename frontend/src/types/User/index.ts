import { FieldsRegister } from "types";

export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  address: string | null;
  city: string | null;
  uf: string | null;
  type: number;
}

export interface UserForRegisterForm extends User, FieldsRegister {}
