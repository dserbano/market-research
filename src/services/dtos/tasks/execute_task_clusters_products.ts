import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskClustersProducts implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_clusters_products/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskClustersProductsResponse {
  public status: number;
  public clusters_products;
}
