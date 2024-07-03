import { Component, OnInit } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { CategorieReclamation } from '../models/categorie-reclamation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit{

  listCategorys: CategorieReclamation[] = [];


  constructor(
    private categoryService: ReclamationService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.categoryService.getCategorieRec().subscribe(data => {
        console.log("data : ", data);
        this.listCategorys = data;
    });
  }


  onRowClick(id: string): void {
    this.router.navigate(['/addCat', id]);
}

deleteApartment(id: string){
  
}

}
