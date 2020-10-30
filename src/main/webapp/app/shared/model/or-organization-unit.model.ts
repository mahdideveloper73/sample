export interface IOrOrganizationUnit {
  id?: number;
  name?: string;
  parentId?: number;
}

export class OrOrganizationUnit implements IOrOrganizationUnit {
  constructor(public id?: number, public name?: string, public parentId?: number) {}
}
