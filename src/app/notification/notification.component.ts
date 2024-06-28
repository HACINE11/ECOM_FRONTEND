import { Component, OnInit, HostListener, ElementRef, OnDestroy } from '@angular/core';

import { ReclamationService } from '../services/reclamation.service';
import { Reclamation } from '../models/reclamation';

import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {


  redNotification: string = "";

  numNotifications: string = "";

  listReclamations: Reclamation[] = [];

  idAdmin: string = "6664c89c481c7a4da8a41750";

  notifications: number = 0;

  private intervalId: any;
 
  constructor(  
    private reclamationService: ReclamationService,
    private router: Router,
    private eRef: ElementRef
  ) {}
  
  showNotifications: boolean = false; 

  ngOnInit(): void {
    this.loadNotifications();

    // Set interval to reload notifications every 15 seconds
    this.intervalId = setInterval(() => {
      this.loadNotifications();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadNotifications(): void {

    this.reclamationService.getReclamation().subscribe(

      (data: Reclamation[]) => {
        this.listReclamations = data.filter(reclamation => reclamation.satisfaction !== "0" 
          && reclamation.satisfaction !== "0000" 
        );
        this.notifications = this.listReclamations.length;
        this.numNotifications = this.notifications.toString();
        this.redNotification = this.notifications > 0 ? "icon-button__badge" : "";

        if (this.numNotifications === "0") {
          this.numNotifications = "";
        }
      },
      error => {
        console.error('Error fetching reclamations', error);
      }
    );


  }

navigateToReclamation(id: string): void {
  

    let obj = { satisfaction: "0000"} 

  this.reclamationService.updateReclamationPatch(id, obj).subscribe((data) =>{
   }); 
  this.router.navigate(['/edit', id]);
  this.showNotifications = false;
  // window.location.reload();
}

toggleNotifications(): void {
  this.showNotifications = !this.showNotifications;
}

@HostListener('document:click', ['$event'])
clickout(event: Event): void {
  if (this.showNotifications && !this.eRef.nativeElement.contains(event.target)) {
    this.showNotifications = false;
  }
}

}
