export const repositories: IRepositories = {
  EMPLOYEE: 'Employee',
  EMPLOYER: 'Employer',
};

export interface IRepositories {
  EMPLOYEE: Entities;
  EMPLOYER: Entities;
}

export type Entities = 'Employee' | 'Employer';
