import { Component, OnInit } from '@angular/core';
import { Categorieclient } from 'src/app/core/models/categorieclient';
import { CategorieClientService } from 'src/app/shared/services';


@Component({
  selector: 'app-categorie-clients',
  templateUrl: './categorie-clients.component.html',
  styleUrls: ['./categorie-clients.component.scss']
})
export class CategorieClientsComponent implements OnInit{
  listCateClients:Categorieclient[] = [];
  listCateClientsSearched:Categorieclient[] = [];
  
  constructor(private sr:CategorieClientService
    
  ){}

  ngOnInit() {
    this.getAllCategorieClients();
    
  }
  getAllCategorieClients(){
    this.sr.getcategorieclients().subscribe({
      next:(rec)=>{
        console.log("*************************");
        this.listCateClients = rec;
        this.listCateClientsSearched = rec;
        console.log("*************************"+this.listCateClients);
        console.log("*************************"+this.listCateClientsSearched);

        
      },
      error:(er)=>alert(er.message)
    })
  }

  removeCategorieClient(id:string){
    this.sr.deletecategorieClient(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listCateClients = this.listCateClients.filter(r=>r._id != id); 
        this.listCateClientsSearched = this.listCateClients;
      },
      error:(e)=>alert(e.message),
    })
  }

  

}