
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client';
import { ClientService } from 'src/app/shared/services';
import { firstValueFrom } from 'rxjs';

import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
(pdfmake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  listClients:Client[] = [];
  listClientsSearched:Client[] = [];
  client: Client | null = null;
  anciennete: string = '';
  searchTerm: string = '';
  clients: any[] = [];
  categories: any[] = [];
  error: string = '';
  filteredClients: any[] = [];
  constructor(private sr:ClientService){}


  
  searchClientrechercher(event: any) {
    const key = event.target.value;
    if (event.target.value.length >= 2) { // Start search after 3 characters
      this.sr.searchClients(key)
      .subscribe((rec) => {
          this.listClientsSearched = rec;
          // this.sortReclamationsByDate();
        }, error => {
          console.error('Error searching reclamtion', error);
        });
    } else {
      this.getAllClients(); // Show all services if search key is less than 3 characters
    }
  }
  

  filterClients(): void {
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredClients = this.clients.filter(client =>
        client.nom.toLowerCase().includes(searchTermLower) ||
        client.prenom.toLowerCase().includes(searchTermLower) ||
        client.email.toLowerCase().includes(searchTermLower) ||
        client.region.toLowerCase().includes(searchTermLower) ||
        client.adressePostal.toLowerCase().includes(searchTermLower) ||
        client.telPortable.toLowerCase().includes(searchTermLower) ||
        client.statutCompte.toLowerCase().includes(searchTermLower)
      );
    } else {
      this.filteredClients = [...this.clients];
    }
  }


  ngOnInit() {
    this.getAllClients();
    
  }
  getAllClients(){
    this.sr.getClients().subscribe({
      next:(rec)=>{
        console.log("*************************");
        this.listClients = rec;
        this.listClientsSearched = rec;
        console.log("*************************"+this.listClients);
        console.log("*************************"+this.listClientsSearched);

        
      },
      error:(er)=>alert(er.message)
    })
  }
  // onSearch(): void {
  //   this.sr.searchClients(this.searchTerm).subscribe(
  //     (data: any[]) => this.clients = data,
  //     (error: any) => console.error('Error fetching clients', error)
  //   );
  // }
  
  removeClient(id:string){
    this.sr.deleteClient(id).subscribe({
      next:()=>{
        alert("Delete success ! ");
        this.listClients = this.listClients.filter(r=>r._id != id); 
        this.listClientsSearched = this.listClients;
      },
      error:(e)=>alert(e.message),
    })
  }

  async calculateAnciennete(clientId: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.sr.calculateAnciennete(clientId));
      this.anciennete = response.anciennete;


      alert('Ancienneté de client est : '+this.anciennete);
    } catch (error) {
      console.error('Error calculating anciennete:', error);
      alert('An error occurred while calculating anciennete');
    }
  }
  exportClientsToPDF() {
    this.sr.getClients().subscribe(clients => {
        const clientDetails = clients.map(client => {
            return [
                { text: 'Nom: ', style: 'header', color: 'blue' },
                { text: client.nom ? client.nom : 'N/A', style: 'content', color: 'black' },
                { text: 'Prénom: ', style: 'header', color: 'blue' },
                { text: client.prenom ? client.prenom : 'N/A', style: 'content', color: 'black' },
                { text: 'Email: ', style: 'header', color: 'blue' },
                { text: client.email ? client.email : 'N/A', style: 'content', color: 'black' },
                { text: 'Adresse: ', style: 'header', color: 'blue' },
                { text: client.addressePostal ? client.addressePostal : 'N/A', style: 'content', color: 'black' }, // Utilisez client.adresse au lieu de client.addressePostal
                { text: 'Téléphone Portable: ', style: 'header', color: 'blue' },
                { text: client.telPortable ? client.telPortable : 'N/A', style: 'content', color: 'black' },
                { text: 'Téléphone Fixe: ', style: 'header', color: 'blue' },
                { text: client.telFixe ? client.telFixe : 'N/A', style: 'content', color: 'black' },
                { text: 'Matricule Fiscale: ', style: 'header', color: 'blue' },
                { text: client.matriculeFiscale ? client.matriculeFiscale : 'N/A', style: 'content', color: 'black' },
                { text: "Date d'Inscription: ", style: 'header', color: 'blue' },
                { text: client.dateInscription ? new Date(client.dateInscription).toDateString() : 'N/A', style: 'content', color: 'black' },
                { text: 'Chiffre d\'Affaires: ', style: 'header', color: 'blue' },
                { text: client.chiffreAffaire ? client.chiffreAffaire.toString() : 'N/A', style: 'content', color: 'black' },
                { text: 'Niveau de Satisfaction: ', style: 'header', color: 'blue' },
                { text: client.niveauSatisfaction ? client.niveauSatisfaction.toString() : 'N/A', style: 'content', color: 'black' },
                { text: 'Statut du Compte: ', style: 'header', color: 'blue' },
                { text: client.statutCompte ? client.statutCompte : 'N/A', style: 'content', color: 'black' },
                { text: 'Région: ', style: 'header', color: 'blue' },
                { text: client.region ? client.region : 'N/A', style: 'content', color: 'black' },
                { text: 'Points de Fidélité: ', style: 'header', color: 'blue' },
                { text: client.pointFidelite ? client.pointFidelite.toString() : 'N/A', style: 'content', color: 'black' }, // Utilisez client.pointsFidelite au lieu de client.pointFidelite
                { text: 'ID de la Catégorie Client: ', style: 'header', color: 'blue' },
                { text: client.categorieClientId ? client.categorieClientId.toString() : 'N/A', style: 'content', color: 'black' },
                { text: '\n' }
            ];
        });

        pdfMake.createPdf({
            content: [
                { text: 'Liste des Clients Plateforme E-MLIHA', fontSize: 25, alignment: 'center', color: 'red' },
                ...clientDetails
            ]
        }).download('clients.pdf');
    });
}

}