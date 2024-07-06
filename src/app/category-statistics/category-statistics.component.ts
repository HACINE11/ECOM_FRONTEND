import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Reclamation } from '../models/reclamation';
import { ReclamationService } from '../services/reclamation.service'; 
import { CategorieReclamation } from '../models/categorie-reclamation';

@Component({
  selector: 'app-category-statistics',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.scss']
})
export class CategoryStatisticsComponent implements OnInit {
  listReclamations: Reclamation[] = [];
  listCategories: CategorieReclamation[] = [];
  dataPointsChart: { y: number; name: string }[] = [];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.reclamationService.getReclamation().subscribe(
      (data: Reclamation[]) => {
        this.listReclamations = data;

        // Fetch categories along with reclamations
        this.reclamationService.getCategorieRec().subscribe(
          (categories: CategorieReclamation[]) => {
            this.listCategories = categories;
            // Now call your counting method or initialize chart here
            const categoryCounts = this.countCategories();
            console.log('Category Counts:', categoryCounts);

            this.dataPointsChart = this.mapCategoryCountsToDataPoints(categoryCounts);

            // Update chart options with the new data points
            this.updateChartOptions();
          },
          error => {
            console.error('Error fetching categories', error);
          }
        );
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
    );
  }

  mapCategoryCountsToDataPoints(categoryCounts: { [key: string]: number }): { y: number; name: string }[] {
    return Object.keys(categoryCounts).map(categoryName => ({
      y: categoryCounts[categoryName],
      name: categoryName
    }));
  }

  countCategories(): { [key: string]: number } {
    const categoryCounts: { [key: string]: number } = {};

    this.listReclamations.forEach(reclamation => {
      const categoryId = reclamation.idCategorieReclamation;

      // Check if the category ID is already counted
      if (!categoryCounts[categoryId]) {
        // Find category name from list of categories
        const category = this.findCategoryById(categoryId);
        if (category) {
          const categoryName = category.libelleCategorie; // Assuming 'libelleCategorie' is the name field
          if (categoryCounts[categoryName]) {
            categoryCounts[categoryName]++;
          } else {
            categoryCounts[categoryName] = 1;
          }
        }
      }
    });

    return categoryCounts;
  }

  findCategoryById(categoryId: string): CategorieReclamation | undefined {
    return this.listCategories.find(c => c._id === categoryId);
  }

  updateChartOptions(): void {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: "Category Reclamation"
      },
      data: [{
        type: "doughnut",
        yValueFormatString: "#,###.##'%'",
        indexLabel: "{name}",
        dataPoints: this.dataPointsChart
      }]
    };
  }

  chartOptions: any = {
    animationEnabled: true,
    title: {
      text: "Category Reclamation"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: []
    }]
  };
}
