import { Component, OnInit} from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';

import { CategorieReclamation } from '../models/categorie-reclamation';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router
  ){}

  categoryForm: FormGroup = new FormGroup({});


  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({

      libelleCategorie:['', Validators.required],
      description:['', Validators.required]
    });
  }


  onSubmit() {
    
    if (this.categoryForm.valid) {

    let category: CategorieReclamation = this.categoryForm.value;

    this.reclamationService.addReclamation(category).subscribe((data) => {
        console.log("data", data)
        alert("Successfully added Category");
        this.router.navigate(['/listRec']);
    });



  }
  }
}
