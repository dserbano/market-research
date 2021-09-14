import {Command, RequestMetaInformation} from '../command';
import { Task } from './task';

export class NewTask implements Command {

  public requestMeta() : RequestMetaInformation {
    return {
      route: '/new_task/',
      verb: 'POST',
      queryParams: [],
      bodyParams: ['keywords', 'language_code', 'location_code'],
      formParams: [],
      public: true
    };
  }

  public keywords;
  public language_code;
  public location_code;

}

export class NewTaskResponse {
  public status: number;
  public task: Task;
}
