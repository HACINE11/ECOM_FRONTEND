import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

interface ClientStatistic {
  categorieClientId: string;
  count: number;
  libelleCatCl: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [], label: 'Nombre de Clients' }
  ];

  public statistics: ClientStatistic[] = [];

  // Tableau associatif pour les couleurs de chaque catégorie client
  public barChartColors: any = {};

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClientStatistics().subscribe(
      (data: ClientStatistic[]) => {
        this.statistics = data;

        const labels = data.map((stat: ClientStatistic) => stat.libelleCatCl);
        const counts = data.map((stat: ClientStatistic) => stat.count);

        this.barChartLabels = labels;
        this.barChartData[0].data = counts;

        // Générer des couleurs aléatoires pour chaque catégorie client
        labels.forEach((label: string) => {
          this.barChartColors[label] = this.getRandomColor();
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des statistiques des clients:', error);
      }
    );
  }

  // Méthode pour générer une couleur aléatoire
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
