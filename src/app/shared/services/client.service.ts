import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SmsService } from './sms.service';
import { Client } from 'src/app/core/models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrlClient = 'http://127.0.0.1:9090/client/';

  constructor(private http: HttpClient, private smsService: SmsService) {}

  // calculateAnciennete(clientId: string): Observable<{ anciennete: string }> {
  //   return this.http.get<{ anciennete: string }>(`${this.apiUrlClient}calculateAnciennete/${clientId}`)
  //     .pipe(
  //       map((response: any) => {
  //         return { anciennete: response.anciennete };
  //       })
  //     );
  // }
  calculateAnciennete(clientId: string): Observable<{ anciennete: string }> {
    return this.http.get<{ anciennete: string }>(`${this.apiUrlClient}/calculateAnciennete/${clientId}`)
      .pipe(
        map((response: any) => {
          return { anciennete: response.anciennete };
        }),
        catchError(this.handleError)
      );
  }
 
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrlClient).pipe(
      catchError(this.handleError)
    );
  }
  addClient(clientData:Client){
    return this.http.post(this.apiUrlClient,clientData);
  }
  // addClient(clientData: Client){
  //   return this.http.post<Client>(this.apiUrlClient, clientData).pipe(
  //     // switchMap(response => {
  //     //   const phoneNumber = clientData.telPortable;
  //     //   const message = 'Client ajouté avec succès';
  //     //   return this.smsService.sendSms(phoneNumber, message).pipe(
  //     //     map(() => response)
  //     //   );
  //     // }),
  //     // catchError(this.handleError) // catchError doit être après switchMap pour capturer toutes les erreurs
  //   );
  // }
// 

  getClientById(id: string){
    return this.http.get<Client>(`${this.apiUrlClient}${id}`)
  }

  updateClient(clientId: string, updatedData: Client){
    return this.http.patch(`${this.apiUrlClient}${clientId}`, updatedData)

  }

  deleteClient(clientId: string) {
    return this.http.delete(`${this.apiUrlClient}${clientId}`)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.error) {
        errorMessage += `\nDetails: ${error.error.error}`;
      }
    }
    console.error('HTTP Error:', errorMessage); // Afficher l'erreur complète dans la console
    return throwError(errorMessage);
  }
}
