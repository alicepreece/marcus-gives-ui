import {Strategy} from "../models/strategy.enum";

export default class StrategyUtils {
  static findESG(strategyValue: Strategy): boolean {
      switch(strategyValue) {
    case Strategy.GLOBALSTRATEGY:
      return false;
    case Strategy.GLOBALESG:
      return true;
    case Strategy.GNEQALL:
      return false;
    case Strategy.GNEQESG:
      return true;
    case Strategy.ESGNEM:
      return true;
    case Strategy.ESGNDE:
      return true;
    case Strategy.EQESGACT:
      return true;
    case Strategy.EQACT:
      return true;
    case Strategy.BONDALL:
      return false;
    default:
      return false;
    }
  }

  static findTargeted(strategyValue: Strategy): boolean {
    switch (strategyValue) {
      case Strategy.GLOBALSTRATEGY:
        return false;
      case Strategy.GLOBALESG:
        return false;
      case Strategy.GNEQALL:
        return true;
      case Strategy.GNEQESG:
        return true;
      case Strategy.ESGNEM:
        return true;
      case Strategy.ESGNDE:
        return true;
      case Strategy.EQESGACT:
        return true;
      case Strategy.EQACT:
        return true;
      case Strategy.BONDALL:
        return true;
      default:
        return true;
    }
  }
}
