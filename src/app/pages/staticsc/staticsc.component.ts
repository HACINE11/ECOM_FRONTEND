import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { ChartOptions, ChartType, ChartDataset, Chart, registerables } from 'chart.js';
 
Chart.register(...registerables);
 
interface ClientStatistic {
  categorieClientId: string;
  count: number;
  libelleCatCl: string;
}
 
@Component({
  selector: 'app-statistics',
  templateUrl: './staticsc.component.html',
  styleUrls: ['./staticsc.component.scss']
})
export class StaticscComponent implements OnInit {
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public doughnutChartLabels: string[] = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [
    {
      id: 'customPlugin',
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const centerX = chart.chartArea.width / 2 + chart.chartArea.left;
        const centerY = chart.chartArea.height / 2 + chart.chartArea.top;
        const image = new Image();
        image.src = '../../../assets/maliha.png';
        const imgSize = 200;
 
        image.onload = () => {
          ctx.save();
          ctx.drawImage(image, centerX - imgSize / 2, centerY - imgSize / 2, imgSize, imgSize);
          ctx.restore();
        };
      }
    }
  ];
 
  public doughnutChartData: ChartDataset[] = [
    { data: [], label: 'Nombre de Clients' }
  ];
 
  public statistics: ClientStatistic[] = [];
 
  constructor(private clientService: ClientService) { }
 
  ngOnInit(): void {
    this.clientService.getClientStatistics().subscribe(
      (data: ClientStatistic[]) => {
        this.statistics = data;
 
        const labels = data.map((stat: ClientStatistic) => stat.libelleCatCl);
        const counts = data.map((stat: ClientStatistic) => stat.count);
 
        this.doughnutChartLabels = labels;
        this.doughnutChartData[0].data = counts;
      },
      (error) => {
        console.error('Erreur lors de la récupération des statistiques des clients:', error);
      }
    );
  }
}