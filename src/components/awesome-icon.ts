import { bindable, inject} from 'aurelia-framework';
import { faCoffee, faSearch, faPlay, faCheck, faEllipsisV, faBars } from "@fortawesome/free-solid-svg-icons";

@inject(Element)
export class AwesomeIconCustomElement {

  icons = {
    "coffee": faCoffee,
    "search": faSearch,
    "play": faPlay,
    "check": faCheck,
    "bars": faBars,
    "ellipsis-v" : faEllipsisV 
  };

  @bindable() icon;
  private iconChosen;

  iconChanged() {
    this.iconChosen = this.icons[this.icon];
  }


}
