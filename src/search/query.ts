import { Task } from './../services/dtos/tasks/task';
import { NewTask, NewTaskResponse } from './../services/dtos/tasks/new_task';
import { AllTasks, AllTasksResponse } from '../services/dtos/tasks/all_tasks';
import { ExecuteTaskSearchVolume, ExecuteTaskSearchVolumeResponse } from './../services/dtos/tasks/execute_task_search_volume';
import { ExecuteTaskBusinesses, ExecuteTaskBusinessesResponse } from './../services/dtos/tasks/execute_task_businesses';
import { ExecuteTaskProducts, ExecuteTaskProductsResponse } from './../services/dtos/tasks/execute_task_products';
import { ExecuteTaskKeywords, ExecuteTaskKeywordsResponse } from './../services/dtos/tasks/execute_task_keywords';
import { ExecuteTaskForecastsSearchVolume, ExecuteTaskForecastsSearchVolumeResponse } from '../services/dtos/tasks/execute_task_forecasts_search_volume';
import { ExecuteTaskClustersProducts, ExecuteTaskClustersProductsResponse } from '../services/dtos/tasks/execute_task_clusters_products';

import { autoinject } from "aurelia-framework";
import { Server } from 'services/server';
import { Router} from 'aurelia-router';
import "./query.css";

@autoinject()
export class QueryViewModel {
  private tasks : Array<Task> = [];

  private keywords : string = "food healthy";
  private language_code : string = "en";
  private location_code : string = "GB";

  private currentTask = null;


  public constructor(private server : Server, private router : Router) {}

  public attached() {
    this.allTasks();
  }

  public allTasks() {
    let request : AllTasks = new AllTasks();

    return this.server.run(request).then((result: AllTasksResponse) => {
      this.tasks = result.tasks;
      console.log(this.tasks);
    });
  }

  public newTask() {
    let request : NewTask = new NewTask();
    request.keywords = this.keywords;
    request.location_code = this.location_code;
    request.language_code = this.language_code;

    console.log(request);

    return this.server.run(request).then((result: NewTaskResponse) => {
      if (result.status == 1) {
        this.allTasks();
        this.executeTask(result.task);
      } else {
        let task = this.tasks.find(x => x["from_keywords"] == this.keywords);
        console.log(task, this.tasks);
        this.executeTask(task);
      }
    }).catch(error => {
      
    });
  }

  public executeTask(task: Task) {
    let request_keywords : ExecuteTaskKeywords = new ExecuteTaskKeywords();
    let request_businesses : ExecuteTaskBusinesses = new ExecuteTaskBusinesses();
    let request_products : ExecuteTaskProducts = new ExecuteTaskProducts();
    let request_search_volume : ExecuteTaskSearchVolume = new ExecuteTaskSearchVolume();
    let request_forecasts_search_volume : ExecuteTaskForecastsSearchVolume = new ExecuteTaskForecastsSearchVolume();
    let request_clusters_products : ExecuteTaskClustersProducts = new ExecuteTaskClustersProducts();

    request_keywords.id = task.id;
    request_businesses.id = task.id;
    request_products.id = task.id;
    request_search_volume.id = task.id;
    request_forecasts_search_volume.id = task.id;
    request_clusters_products.id = task.id;

    this.currentTask = {
      id: task.id,
      keywords: null,
      businesses: null,
      products: null,
      search_volume: null,
      forecasts_search_volume: null,
      clusters_products: null
    };
    this.server.run(request_keywords).then((result_1: ExecuteTaskKeywordsResponse) => {
      this.currentTask.keywords = result_1.keywords;
      this.server.run(request_businesses).then((result_2: ExecuteTaskBusinessesResponse) => {
        this.currentTask.businesses = result_2.businesses;
        this.server.run(request_products).then((result_3: ExecuteTaskProductsResponse) => {
          this.currentTask.products = result_3.products;
          this.server.run(request_search_volume).then((result_4: ExecuteTaskSearchVolumeResponse) => {
            this.currentTask.search_volume = result_4.search_volume;
            this.server.run(request_forecasts_search_volume).then((result_5: ExecuteTaskForecastsSearchVolumeResponse) => {
              this.currentTask.forecasts_search_volume = result_5.forecasts_search_volume;
              this.server.run(request_clusters_products).then((result_6: ExecuteTaskClustersProductsResponse) => {
                this.currentTask.clusters_products = result_6.clusters_products;
                console.log("Y ALLORA!");
                (this.router as any).navigateWithParams("report", {id: task.id}, this.currentTask);
              });
             });
          });
        });
      });
    });
  }

}
