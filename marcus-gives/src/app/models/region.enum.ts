export enum RegionEnum {
  SAMERICA = "South America",
  NAMERICA = "North America",
  AFRICA = "Africa",
  EUROPE = "Europe",
  MEAST = "Middle East",
  CANDSASIA = "Central and South Asia",
  EANDSEASIA = "East and South East Asia",
  OCEANIA = "Oceania"
}

export const RegionEnumList: {
  key: string;
  value: string;
}[] = Object.entries(RegionEnum)
  .map(([key, value]) => ({ key, value }));
