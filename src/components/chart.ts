import { bindable, inject} from 'aurelia-framework';
import { Chart, registerables} from 'chart.js';

@inject(Element)
export class ChartCustomElement {

  @bindable() data;
  @bindable() labels;
  @bindable() type : any = "line";
  @bindable() title : string = "";
  private chartDom;


  public draw = () => {
    new Chart(this.chartDom.getContext('2d'), {
      type: this.type,
      data: {
          labels: this.labels,
          datasets: this.data
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins: {
            title: {
                display: true,
                text: this.title
            }
          }
        }
     });
  }

  public attached() {
    Chart.register(...registerables);
    this.draw();
  }



}
