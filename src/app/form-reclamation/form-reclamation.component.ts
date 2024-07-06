import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Reclamation } from '../models/reclamation';
import { CategorieReclamation } from '../models/categorie-reclamation';

import { ReclamationService } from '../services/reclamation.service';

@Component({
  selector: 'app-form-reclamation',
  templateUrl: './form-reclamation.component.html',
  styleUrls: ['./form-reclamation.component.scss']
})
export class FormReclamationComponent implements OnInit{

  reclamationForm: FormGroup = new FormGroup({});
  selectedDescription: string | null = null;
  imageFile: File | null = null;
  idClient: string = "6664c89c481c7a4da8a41750";
  idAdmin: string = "testtest";
  imagePreviewUrl: string | null = null;

  openChat: boolean = false;

  listCategorie: CategorieReclamation[] = [];

  categorieId!: string;


  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ){}

  ngOnInit(): void {
    this.reclamationForm = this.formBuilder.group({

      notes:['', Validators.required],
      statut_rec:['', Validators.required],
      title: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      priority: [{ value: '', disabled: true }],
      category: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: true }]
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    

    if(id) {
      this.reclamationService.getReclamationByIdRec(id).subscribe((data) => {
        this.populateForm(data);
        this.imagePreviewUrl = data.image;

        console.log("sat", data.satisfaction);

        if(data.satisfaction === "0001") {
          this.openChat = true;
        }

      });
          
    }

    this.reclamationService.getCategorieRec().subscribe((data) => {
        this.listCategorie = data;
    });
  }

      // Getters for form controls
      get title() { return this.reclamationForm.get('title'); }
      get description() { return this.reclamationForm.get('description'); }
      get priority() { return this.reclamationForm.get('priority'); }
      get category() { return this.reclamationForm.get('category'); }

      get notes() { return this.reclamationForm.get('notes');}
      get state() { return this.reclamationForm.get('statut_rec');}
    
      populateForm(reclamation: Reclamation): void {
        if (this.title) this.title.setValue(reclamation.title);
        if (this.description) this.description.setValue(reclamation.description);
        if (this.priority) this.priority.setValue(reclamation.priorite);
        if (this.category) this.category.setValue(reclamation.idCategorieReclamation);
        if(this.notes) this.notes.setValue(reclamation.notes);
        if(this.state) this.state.setValue(reclamation.statut_rec);
      }

      goBack() {
        
      }

  onSubmit() {

    if(this.reclamationForm.valid){

      let reclamation : Reclamation = this.reclamationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if(id) {
        let obj = {statut_rec: reclamation.statut_rec, notes: reclamation.notes, notification: "you have some notifications"} 
        this.reclamationService.updateReclamation(id, obj).subscribe((data) =>{
            this.router.navigate(['/listRec']);
            //  ziedtuihri@gmail.com
            let obj2 = {email:"ziedtuihri@gmail.com"}
            this.reclamationService.sendEmail(obj2).subscribe((data) => {
                console.log("data .. ",data);
            })
        });   
      }
    }
  }

}
