import { autoinject } from "aurelia-framework";
import { ExecuteTask, ExecuteTaskResponse } from "services/dtos/tasks/execute_task";
import { Server } from 'services/server';

@autoinject()
export class ReportViewModel {

  private keywords = [];
  private businesses = [];
  private products = [];
  private volume = [];
  private clusters_products = [];
  private forecasts_volume = [];

  private task_id = null;
  private iter =  Array.from(Array(200), (_, index) => index + 1);





  private isActive;
  private loading: boolean; 

  private view = "businesses";

  public constructor(private server : Server) {}

  public collapse = () => {this.isActive = !this.isActive;}

  public changeView = (view) => {this.view = view;}

  public activate(urlParams, routerParams)
  { 
    this.loading = true;
    this.task_id = urlParams.id;
    if (this.task_id != null) {
      if (routerParams.data != null) {
        console.log(routerParams.data)
        this.keywords = routerParams.data.keywords;
        this.businesses = routerParams.data.businesses;
        this.products = routerParams.data.products;
        this.volume = routerParams.data.search_volume;
        this.clusters_products = routerParams.data.clusters_products;
        this.forecasts_volume = routerParams.data.forecasts_search_volume.slice(0, 200);

        this.loading = false;
      } else {
        let request : ExecuteTask = new ExecuteTask();
        request.id = this.task_id;
        this.server.run(request).then((result: ExecuteTaskResponse) => {
          console.log(result);
          this.keywords = result.keywords;
          this.businesses = result.businesses;
          this.products = result.products;
          this.volume = result.search_volume;
          this.clusters_products = result.clusters_products;
          this.forecasts_volume = result.forecasts_search_volume.slice(0, 200);
          this.loading = false;
        }).catch(error => {
          
        });
      }
    }

  }



}
