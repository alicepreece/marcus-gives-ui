import {User} from "./user.model";
import {Scores} from "./scores.model";
import {Donation} from "./donation.model";

export class Client {
  id: number;
  user: User;
  accountNumber: string;
  emailAddress: string;
  recommendation: string;
  donations: Donation[];
  pastDonations: Donation[];
  investableAmount: number;
  advisorTeam: string;
  scores?: Scores;
}
