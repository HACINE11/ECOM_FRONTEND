import { Component, OnInit } from '@angular/core';

import { Reclamation } from '../models/reclamation';

import { ReclamationService } from '../services/reclamation.service'; 
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.scss']
})
export class ListReclamationComponent {

  listReclamations: Reclamation[] = [];

  
  constructor(  
    private reclamationService: ReclamationService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.reclamationService.getReclamation().subscribe(
      (data: Reclamation[]) => {
        this.listReclamations = data;
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
  );
  }

  onRowClick(id: string): void {
    this.router.navigate(['/edit', id]);
}

}
