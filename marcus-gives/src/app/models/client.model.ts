export interface Client {
  id: number;
  firstName: string;
  surname: string;
  accountNumber: string;
  emailAddress: string;
  preferences: string;
  projects: string[];
  pastProjects: string[];
  investableAmount: number;
}
