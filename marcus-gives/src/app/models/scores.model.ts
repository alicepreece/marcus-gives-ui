import {FeesEnum} from "./fees.enum";
import {RegionEnum} from "./region.enum";

export class Scores {
  id: number;
  socialOverEnv: boolean;
  economyOverHealthcare: boolean;
  povertyOverEducation: boolean;
  targetedOverDiverse: boolean;
  managementFees: FeesEnum;
  esgOverAll: boolean;
  shortOverLongTerm: boolean;
  region: RegionEnum[];
}
