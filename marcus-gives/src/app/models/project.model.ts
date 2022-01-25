import {Client} from "./client.model";

export interface Project {
  id: number;
  name: string;
  total: number;
  region?: string;
  aims?: string;
  strategy?: string;
  investors?: Client[];
}
