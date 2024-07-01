import { Component } from '@angular/core';
import { CategorieProduit } from '../model/categorie.model';
import { CategorieService } from '../core/services/categorie.service';

@Component({
  selector: 'app-management-categories',
  templateUrl: './management-categories.component.html',
  styleUrls: ['./management-categories.component.scss'],
})
export class ManagementCategoriesComponent {
  categories: CategorieProduit[] = [];
  toggle = false;
  alert = 0;
  message: string = '';
  displayedColumns: string[] = [
    'Categorie',
    'description',
    'update',
    'details',
    'actions',
  ];

  constructor(private cs: CategorieService) {
    this.refresh();
  }

  showCategorie() {
    this.toggle = !this.toggle;
  }

  addCategorie(c: CategorieProduit) {
    this.cs.addCategorie(c).subscribe({
      next: (d: any) => {
        this.message = d.message;
        this.alert = 1;
        this.refresh();
      },
      error: (e) => {
        this.message = e.message;
        this.alert = 2;
      },
    });
  }

  refresh() {
    this.cs.getCategories().subscribe({
      next: (d) => {
        this.categories = d;
      },
      error: (e) => alert(e.message),
    });
  }

  deleteCategorie(id: number) {
    this.cs.deleteCategorie(id).subscribe({
      next: (d: any) => {
        this.message = 'delete successfuly';
        this.alert = 1;
        this.categories = this.categories.filter((cat) => cat._id !== id);
      },
      error: (e) => {
        this.message = e.message;
        this.alert = 2;
      },
    });
  }
}
