import { RouterConfiguration, Router } from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {

  private router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.options.pushState = false;
    config.options.root = '/';
    config.map( [
      { route: '', redirect: 'query' },
      { route: 'query', moduleId: PLATFORM.moduleName('search/query'), name: 'query', title: 'Query', nav: true },
      { route: 'report/:id', moduleId: PLATFORM.moduleName('search/report/report'), name: 'report', title: 'Report', nav: false }
    ]);

    (this.router as any).navigateWithParams = (routeName, queryParams, params) => {
        let routerParams = this.router.routes.find(x => x.name === routeName);
        routerParams.data = params;
        this.router.navigateToRoute(routeName, queryParams);
    }  
  }
}
