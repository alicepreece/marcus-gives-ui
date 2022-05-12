import {RoleEnum} from "./role.enum";

export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  authdata?: string;
}
