import {RoleEnum} from "../role.enum";
import {mockUserClient} from "./mockUser";
import {mockProject} from "./mockProjects";

export const mockClient = {
  id: 1,
  user: mockUserClient,
  accountNumber: '12345',
  emailAddress: 'email@adress.com',
  recommendation: 'recommendation',
  donations: [{project: mockProject, clientId: 1, amount: 350, timestamp: 5436313}],
  pastDonations: [{project: mockProject, clientId: 1, amount: 20, timestamp: 5436000}],
  investableAmount: 3000,
  advisorTeam: 'team',
}
