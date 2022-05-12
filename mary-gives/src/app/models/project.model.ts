import {GoalEnum} from "./goal.enum";
import {RegionEnum} from "./region.enum";
import { Scores } from "./scores.model";

export class Project {
  id: number;
  name: string;
  goal: GoalEnum;
  total: number;
  region: RegionEnum;
  aims: string;
  strategy: string;
  fees?: string;
  investors?: number[];
  scores: Scores;
}
