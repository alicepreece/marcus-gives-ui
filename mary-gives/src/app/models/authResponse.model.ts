import {User} from "./user.model";

export class AuthResponse {
  user: User;
  message: string;
  isAuthenticated: boolean;
  authdata?: string;
}
