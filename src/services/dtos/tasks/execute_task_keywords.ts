import {Command, RequestMetaInformation} from '../command';

export class ExecuteTaskKeywords implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/execute_task_keywords/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['id'],
      formParams: [],
      public: true
    };
  }

  public id: number;
}

export class ExecuteTaskKeywordsResponse {
  public status: number;
  public keywords;
}
