import {Command, RequestMetaInformation} from '../command';
import { Task } from './task';

export class AllTasks implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/all_tasks/',
      verb: 'GET',
      queryParams: [],
      bodyParams: [],
      formParams: [],
      public: true
    };
  }

}

export class AllTasksResponse {
  public status: number;
  public tasks: Array<Task>;
}
