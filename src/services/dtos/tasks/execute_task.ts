import {Command, RequestMetaInformation} from '../command';

export class ExecuteTask implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id;
  public loading = true;
}

export class ExecuteTaskResponse {
  public status;
  public keywords;
  public businesses;
  public products;
  public search_volume;
  public clusters_products;
  public forecasts_search_volume;
}
