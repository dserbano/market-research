import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'aurelia-bootstrap-select/dist/amd/bootstrap-select-bs4.css';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap-material-design';
import './main.css'
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCircle,
  faHome,
  faSpinner,
  faCoffee,
  faMugHot
} from "@fortawesome/free-solid-svg-icons";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('moment'))
    .plugin(PLATFORM.moduleName('aurelia-bootstrap-tagsinput'), config => {
      config.extra.bootstrapVersion = 4;
    })
    .plugin(PLATFORM.moduleName('aurelia-bootstrap-select'))
    .plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
      // extra attributes, with config.extra
      config.extra.withDateIcon = true;
  
      // or even any picker options, with config.options
      config.options.format = 'YYYY-MM-DD';
      config.options.showTodayButton = true;
    })
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-fontawesome'), {
      icons: [ fab, faCircle, faHome, faSpinner, faCoffee, faMugHot ]
    });



  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
