import {User} from "./user.model";

export class Client {
  id: number;
  user: User;
  accountNumber: string;
  emailAddress: string;
  recommendation: string;
  projects: number[];
  pastProjects: number[];
  investableAmount: number;
  advisorTeam: string;
}
