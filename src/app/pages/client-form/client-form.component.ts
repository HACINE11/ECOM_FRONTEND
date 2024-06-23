import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categorieclient } from 'src/app/core/models/categorieclient';
import { Client } from 'src/app/core/models/client';
import { CategorieClientService, ClientService } from 'src/app/shared/services';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',

  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent  implements OnInit{
  clientForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  client!: Client;
  listCatClient!:Categorieclient[]
  statuslist = ['actif', 'inactif', 'suspendu']
  idc!:string;
  c!:Client;
  constructor(private clientService: ClientService, private fb: FormBuilder,
    private ccs: CategorieClientService,
    private ar: ActivatedRoute,
  ) {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressePostal: ['', Validators.required],
      telPortable: ['', Validators.required],
      telFixe: [Validators.required],
      matriculeFiscale: [ '',Validators.required],
      dateInscription: ['', Validators.required],
      chiffreAffaire: [ Validators.required],
      niveauSatisfaction: ['', Validators.required],
      statutCompte: ['', Validators.required],
      region: ['', Validators.required],
      pointFidelite: [ '100',Validators.required],
      categorieClientId: ['', Validators.required]
      
    });
    // if(this.idc != undefined){
    //   this.clientService.getClientById(this.idc).subscribe({
    //     next:(l)=>{
    //       alert("update succes !")
    //       this.c = l
    //       console.log("ffffffffffffffffffffffffffff"+this.c);
          
    //     },
    //     error:(er)=>alert(er.message)
    //   })
    //   this.clientForm.patchValue(this.c);

    // }

    // this.ccs.getcategorieclients().subscribe({
    //   next:(l)=>{
    //     this.listCatClient = l;
    //     console.log(this.listCatClient);
        
    //   },
    //   error:(er)=>alert(er.message)
    // })
    // this.idc = ar.snapshot.params["id"]
    // console.log(this.idc);
    
  }
  ngOnInit(): void {
    this.idc = this.ar.snapshot.params['id'];
    console.log(this.idc);

    if (this.idc) {
      this.clientService.getClientById(this.idc).subscribe({
        next: (client) => {
          this.c = client;
          this.clientForm.patchValue(this.c);
        },
        error: (error) => {
          alert('Erreur lors de la récupération du client : ' + error.message);
        }
      });
    }

    this.ccs.getcategorieclients().subscribe({
      next: (categories) => {
        this.listCatClient = categories;
        console.log(this.listCatClient);
      },
      error: (error) => {
        alert('Erreur lors de la récupération des catégories : ' + error.message);
      }
    });
  }
  
  onSubmit() {
   if (this.idc == undefined) {
      console.log(this.clientForm.value);
      if (this.clientForm.valid) {
      console.log("****************");
        this.clientService.addClient(this.clientForm.value).subscribe(
          response => {
            // this.successMessage = 'Client ajouté avec succès et un message de confirmation a été envoyé.';
            // this.errorMessage = null;
            alert('Client ajouté avec succès');
          },
          error => {
            // this.errorMessage = 'Erreur lors de l\'ajout du client';
            // this.successMessage = null;
            console.error('Erreur lors de l\'ajout du client', error); // Afficher l'erreur complète dans la console
          }
        );
      } else {
        alert('Veuillez remplir tous les champs requis.');
        this.successMessage = null;
      }
    }else{
      this.clientService.updateClient(this.idc,this.clientForm.value).subscribe({
        next:(l)=>{
          alert("update succes !")
          
        },
        error:(er)=>alert(er.message)
      })

    }
   }
}  
