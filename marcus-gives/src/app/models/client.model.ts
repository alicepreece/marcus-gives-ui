import {User} from "./user.model";
import {Scores} from "./scores.model";

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
  scores?: Scores;
}
