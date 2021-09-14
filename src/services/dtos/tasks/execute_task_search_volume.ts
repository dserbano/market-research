import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskSearchVolume implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_search_volume/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskSearchVolumeResponse {
  public status: number;
  public search_volume;
}
