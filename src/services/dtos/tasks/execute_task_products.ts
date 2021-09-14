import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskProducts implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_products/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskProductsResponse {
  public status: number;
  public products;
}
