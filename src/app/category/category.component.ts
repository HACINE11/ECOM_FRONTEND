import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReclamationService } from '../services/reclamation.service';
import { CategorieReclamation } from '../models/categorie-reclamation';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  title: string = "ajouter une categorie";

  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

    let id = this.activatedRoute.snapshot.params['id'];

    console.log(id);
    if (id) {
      this.title = "mettre a jour une categorie";
      this.reclamationService.getCategorieById(id).subscribe(data => {
        console.log("data update ::", data);
        this.categoryForm.patchValue({
          libelleCategorie: data.libelleCategorie,
          description: data.description
        });
      }, error => {
        console.error('Error fetching category data', error);
      });
    }
  }

  get libelleCategorie(): AbstractControl | null {
    return this.categoryForm.get('libelleCategorie');
  }

  get description(): AbstractControl | null {
    return this.categoryForm.get('description');
  }

  onSubmit() {
    let id = this.activatedRoute.snapshot.params['id'];

    if (this.categoryForm.valid) {
      const category: CategorieReclamation = this.categoryForm.value;

      if (id) {
        this.reclamationService.updateCategorie(id, category).subscribe(data => {
          console.log("data :: ", data);
          alert('Successfully updated Category');
          this.router.navigate(['/listCat']);
        }, error => {
          console.error('Error updating category', error);
          alert('Failed to update Category');
        });
      } else {
        this.reclamationService.addCategorieRec(category).subscribe(
          (data) => {
            console.log('data', data);
            alert('Successfully added Category');
            this.router.navigate(['/listCat']);
          },
          (error) => {
            console.error('Error adding category', error);
            alert('Failed to add Category');
          }
        );
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
