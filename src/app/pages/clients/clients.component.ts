
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
export class ClientsComponent implements OnInit {
  listClients: Client[] = [];
  listClientsSearched: Client[] = [];
  client: Client | null = null;
  anciennete: string = '';

  // Search criteria
  searchNom: string = '';
  searchPrenom: string = '';
  searchEmail: string = '';
  searchAddressePostal: string = '';
  searchTelPortable: string = '';
  searchTelFixe: string = '';
  searchMatriculeFiscale: string = '';
  searchDateInscription: string = '';
  searchChiffreAffaire: string = '';
  searchNiveauSatisfaction: string = '';
  searchStatutCompte: string = '';
  searchRegion: string = '';
  searchPointFidelite: string = '';
  searchCategorieClientId: string = '';

  constructor(private sr: ClientService) {}

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.sr.getClients().subscribe({
      next: (rec) => {
        this.listClients = rec;
        this.listClientsSearched = rec;
      },
      error: (er) => alert(er.message)
    });
  }
  onSearch() {
    this.listClientsSearched = this.listClients.filter(client => {
      return (!this.searchNom || client.nom.toLowerCase().includes(this.searchNom.toLowerCase())) &&
             (!this.searchPrenom || client.prenom.toLowerCase().includes(this.searchPrenom.toLowerCase())) &&
             (!this.searchEmail || client.email.toLowerCase().includes(this.searchEmail.toLowerCase())) &&
             (!this.searchAddressePostal || client.addressePostal.toLowerCase().includes(this.searchAddressePostal.toLowerCase())) &&
             (!this.searchTelPortable || client.telPortable.toString().includes(this.searchTelPortable.toString())) &&
             (!this.searchTelFixe || client.telFixe.toString().includes(this.searchTelFixe.toString())) &&
             (!this.searchMatriculeFiscale || client.matriculeFiscale.toString().includes(this.searchMatriculeFiscale.toString())) &&
             (!this.searchDateInscription || new Date(client.dateInscription).toLocaleDateString().includes(this.searchDateInscription)) &&
             (!this.searchChiffreAffaire || client.chiffreAffaire.toString().includes(this.searchChiffreAffaire.toString())) &&
             (!this.searchNiveauSatisfaction || client.niveauSatisfaction.toString().includes(this.searchNiveauSatisfaction.toString())) &&
             (!this.searchStatutCompte || client.statutCompte.toLowerCase().includes(this.searchStatutCompte.toLowerCase())) &&
             (!this.searchRegion || client.region.toLowerCase().includes(this.searchRegion.toLowerCase())) &&
             (!this.searchPointFidelite || client.pointFidelite.toString().includes(this.searchPointFidelite.toString())) &&
             (!this.searchCategorieClientId || client.categorieClientId.toString().includes(this.searchCategorieClientId.toString()));
    });
  }
  removeClient(id: string) {
    this.sr.deleteClient(id).subscribe({
      next: () => {
        alert("Delete success!");
        this.listClients = this.listClients.filter(r => r._id != id);
        this.listClientsSearched = this.listClients;
      },
      error: (e) => alert(e.message),
    });
  }

  async calculateAnciennete(clientId: string): Promise<void> {
    try {
      const response = await firstValueFrom(this.sr.calculateAnciennete(clientId));
      this.anciennete = response.anciennete;
      alert('Ancienneté de client est : ' + this.anciennete);
    } catch (error) {
      console.error('Error calculating anciennete:', error);
      alert('An error occurred while calculating anciennete');
    }
  }

 
  exportClientsToPDF() {
    this.sr.getClients().subscribe(clients => {
      const clientDetails = clients.map(client => {
        return [
          { text: 'Nom: ' + (client.nom || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Prénom: ' + (client.prenom || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Email: ' + (client.email || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Adresse: ' + (client.addressePostal || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Téléphone Portable: ' + (client.telPortable || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Téléphone Fixe: ' + (client.telFixe || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Matricule Fiscale: ' + (client.matriculeFiscale || 'N/A'), style: 'header', color: 'blue' },
          { text: "Date d'Inscription: " + (client.dateInscription ? new Date(client.dateInscription).toDateString() : 'N/A'), style: 'header', color: 'blue' },
          { text: 'Chiffre d\'Affaires: ' + (client.chiffreAffaire || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Niveau de Satisfaction: ' + (client.niveauSatisfaction || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Statut du Compte: ' + (client.statutCompte || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Région: ' + (client.region || 'N/A'), style: 'header', color: 'blue' },
          { text: 'Points de Fidélité: ' + (client.pointFidelite || 'N/A'), style: 'header', color: 'blue' },
          { text: 'ID de la Catégorie Client: ' + (client.categorieClientId || 'N/A'), style: 'header', color: 'blue' },
          { text: '\n' }
        ];
      });

      const documentDefinition = {
        content: [
          { text: 'Liste des Clients Plateforme E-MLIHA', fontSize: 25, alignment: 'center', color: 'red', margin: [0, 0, 0, 20] },
          ...clientDetails
        ],
        styles: {
          header: { fontSize: 12, bold: true },
          content: { fontSize: 10 }
        }
      };

      pdfMake.createPdf(documentDefinition).download('clients.pdf');
    });
  }
}