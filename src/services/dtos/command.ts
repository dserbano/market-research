
export interface RequestMetaInformation {
  route: string,
  verb: string,
  queryParams: Array<string>,
  bodyParams: Array<string>,
  formParams: Array<string>,
  public : boolean
}

export interface Command {
  requestMeta() : RequestMetaInformation;
}
