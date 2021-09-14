import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskForecastsSearchVolume implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_forecasts_search_volume/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskForecastsSearchVolumeResponse {
  public status: number;
  public forecasts_search_volume;
}
