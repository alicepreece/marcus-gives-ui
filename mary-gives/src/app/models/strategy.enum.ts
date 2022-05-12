export enum Strategy {
  GLOBALSTRATEGY = 'Global fully diversified index fund',
  GLOBALESG = 'Global fully diversified ESG only fund',
  GNEQALL = 'Global-North equity only fund',
  GNEQESG = 'Global-North equity ESG fund',
  BONDALL = 'Majority bond diversified fund',
  CRYPTO = 'Crypto investment fund',
  ESGNEM = 'ESG global ETF exc emerging economies',
  ESGNDE = 'ESG global ETF exc developing economies',
  EQACT = 'Active management majority equity',
  EQESGACT = 'Active management ESG equity fund'
}

export const StrategyEnumList: {
  key: string;
  value: string;
}[] = Object.entries(Strategy)
  .map(([key, value]) => ({ key, value }));
