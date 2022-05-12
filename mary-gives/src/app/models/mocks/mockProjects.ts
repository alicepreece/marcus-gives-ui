import {GoalEnum} from "../goal.enum";
import {RegionEnum} from "../region.enum";
import {Strategy} from "../strategy.enum";
import {FeesEnum} from "../fees.enum";
import {Scores} from "../scores.model";
import {Project} from "../project.model";

export const mockScore: Scores = {
  id: 0,
  socialOverEnv: false,
  economyOverHealthcare: false,
  povertyOverEducation: true,
  targetedOverDiverse: false,
  managementFees: FeesEnum.NONE,
  esgOverAll: true,
  shortOverLongTerm: false,
  region: [RegionEnum.EUROPE]
}

export const mockProject: Project = {
  id: 0,
  name: 'alpha',
  goal: GoalEnum.ENVIRONMENT,
  total: 200,
  region: RegionEnum.EUROPE,
  aims: 'Helping',
  strategy: Strategy.GLOBALESG,
  fees: 'NONE',
  investors: [0],
  scores: mockScore
}

export const mockScore1: Scores = {
  id: 1,
  socialOverEnv: true,
  economyOverHealthcare: true,
  povertyOverEducation: false,
  targetedOverDiverse: false,
  managementFees: FeesEnum.UNDER5,
  esgOverAll: true,
  shortOverLongTerm: false,
  region: [RegionEnum.EANDSEASIA]
}

export const mockProject1: Project = {
  id: 1,
  name: 'beta',
  goal: GoalEnum.INEQUALITY,
  total: 300,
  region: RegionEnum.EANDSEASIA,
  aims: 'Equal',
  strategy: Strategy.GLOBALESG,
  fees: 'UNDER5',
  investors: [1],
  scores: mockScore1
}

export const mockProjects: Project[] = [mockProject, mockProject1]


