import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categorieclient } from 'src/app/core/models/categorieclient';
import { CategorieClientService, ClientService } from 'src/app/shared/services';
@Component({
  selector: 'app-categorie-client-form',
  templateUrl: './categorie-client-form.component.html',
  styleUrls: ['./categorie-client-form.component.scss']
})
export class CategorieClientFormComponent implements OnInit{

    cclientForm: FormGroup;
    errorMessage: string | null = null;
    successMessage: string | null = null;
    categorieclient!: Categorieclient;
    // listCatClient!:Categorieclient[]
   
    idcc!:string;
    cc!:Categorieclient;
    constructor(private categorieclientService: CategorieClientService, private fb: FormBuilder,
      private ccs: CategorieClientService,
      private ar: ActivatedRoute,
    ) {
      this.cclientForm = this.fb.group({
        libelleCatCl: ['', Validators.required],
        descriptionCatCl: ['', Validators.required],
        promotionCatCl: ['', Validators.required],
        
        
      });
      
      
    }
    ngOnInit(): void {
      this.idcc = this.ar.snapshot.params['id'];
      console.log(this.idcc);
  
      if (this.idcc) {
        this.categorieclientService.getcategorieClientById(this.idcc).subscribe({
          next: (categorieclient) => {
            this.cc = categorieclient;
            this.cclientForm.patchValue(this.cc);
          },
          error: (error) => {
            alert('Erreur lors de la récupération du categorie client : ' + error.message);
          }
        });
      }
  
      // this.ccs.getcategorieclients().subscribe({
      //   next: (categories) => {
      //     this.listCatClient = categories;
      //     console.log(this.listCatClient);
      //   },
      //   error: (error) => {
      //     alert('Erreur lors de la récupération des catégories : ' + error.message);
      //   }
      // });
    }
    
    onSubmit() {
     if (this.idcc == undefined) {
        console.log(this.cclientForm.value);
        if (this.cclientForm.valid) {
        console.log("****************");
          this.categorieclientService.addCategorieClient(this.cclientForm.value).subscribe(
            response => {
             
              alert('Categorie Client ajouté avec succès');
            },
            error => {
             
              console.error('Erreur lors de l\'ajout du categorie client', error); // Afficher l'erreur complète dans la console
            }
          );
        } else {
          alert('Veuillez remplir tous les champs requis.');
          this.successMessage = null;
        }
      }else{
        this.categorieclientService.updatecategorieClient(this.idcc,this.cclientForm.value).subscribe({
          next:(l)=>{
            alert("update succes !")
            
          },
          error:(er)=>alert(er.message)
        })
  
      }
     }
  }  
  