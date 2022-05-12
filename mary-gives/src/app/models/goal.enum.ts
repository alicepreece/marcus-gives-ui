export enum GoalEnum {
  POVERTTY = 'No Poverty',
  EDUCATION = 'Quality Education',
  ENVIRONMENT = 'Protect the Environment',
  SANITATION = 'Improve Sanitation',
  HEALTH = 'Better Health and Wellbeing',
  INEQUALITY = 'More Equal Societies'
}

export const GoalEnumList: {
  key: string;
  value: string;
}[] = Object.entries(GoalEnum)
  .map(([key, value]) => ({ key, value }));
