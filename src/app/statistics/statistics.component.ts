import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Reclamation } from '../models/reclamation';
import { ReclamationService } from '../services/reclamation.service'; 

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit{

  listReclamations: Reclamation[] = [];
  constructor(  
    private reclamationService: ReclamationService
  ) {}

  t !:number;
  y !:number;
  z !:number;
  x !:number;
  w !:number;


  ngOnInit(): void {
    this.reclamationService.getReclamation().subscribe(
      (data: Reclamation[]) => {
        this.listReclamations = data;
        
        this.calculateStatistics();
        this.updateChartOptions();
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
  );

  }


  calculateStatistics(): void {
    this.y = this.listReclamations.filter(r => r.statut_rec === 'in_progress').length;
    this.z = this.listReclamations.filter(r => r.statut_rec === 'on_hold').length;
    this.x = this.listReclamations.filter(r => r.statut_rec === 'resolved').length;
    this.w = this.listReclamations.filter(r => r.statut_rec === 'new').length;

    this.t = this.listReclamations.length;
  }

  updateChartOptions(): void {
    this.chartOptions = {
      animationEnabled: true,
      theme: "dark2",
      exportEnabled: true,
      title: {
        text: "Reclamation Statistics"
      },
      data: [{
        type: "pie",
        indexLabel: "{name}: {y}",
        dataPoints: [
          { name: "In Progress", y: this.y },
          { name: "On Hold", y: this.z },
          { name: "Resolved", y: this.x },
          { name: "New", y: this.w },
          { name: "Total", y: this.t }
        ]
      }]
    };
  }

  chartOptions: any = {};


}
