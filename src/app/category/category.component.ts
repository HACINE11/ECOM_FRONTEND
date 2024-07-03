import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { CategorieReclamation } from '../models/categorie-reclamation';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      libelleCategorie: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z ]*$')
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
          Validators.pattern('^[a-zA-Z0-9 .,!?]*$')
        ]
      ]
    });
  }

  get libelleCategorie(): AbstractControl | null {
    return this.categoryForm.get('libelleCategorie');
  }

  get description(): AbstractControl | null {
    return this.categoryForm.get('description');
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: CategorieReclamation = this.categoryForm.value;

      this.reclamationService.addCategorieRec(category).subscribe(
        (data) => {
          console.log('data', data);
          alert('Successfully added Category');
          this.router.navigate(['/listRec']);
        },
        (error) => {
          console.error('Error adding category', error);
          alert('Failed to add Category');
        }
      );
    } else {
      this.categoryForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
    }
  }
}
