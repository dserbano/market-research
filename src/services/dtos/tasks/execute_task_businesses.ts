import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskBusinesses implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_businesses/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskBusinessesResponse {
  public status: number;
  public businesses;
}
