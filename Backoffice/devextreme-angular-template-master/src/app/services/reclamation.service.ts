import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reclamation } from '../models/reclamation';

import { CategorieReclamation } from '../models/categorie-reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  baseUrl: string = 'http://localhost:9090/'; 

  constructor(
    private http: HttpClient
  ) { }


      //CRUD Reclamation:
      apiUrlReclamations: string = this.baseUrl + 'reclamations/'; 

      getReclamation(): Observable<Reclamation[]>{
        return this.http.get<Reclamation[]>(this.apiUrlReclamations);
      }

      
    getReclamationByIdRec(id: string): Observable<Reclamation> {
      return this.http.get<Reclamation>(this.apiUrlReclamations+ "rec/" + id);
    }

    sendEmail(email: Object): Observable<void>{
      return this.http.post<void>("http://localhost:9090/reclamations/sendEmail", email);
    }

    updateReclamation(id: string, obj: object){
      return this.http.patch<void>(this.apiUrlReclamations + id, obj);
    }

      //CRUD categorieReclamation:
      apiUrlCategoRec: string = this.baseUrl + 'categorieReclamations/';

      getCategorieRec(): Observable<CategorieReclamation[]> {
        return this.http.get<CategorieReclamation[]>(this.apiUrlCategoRec);
      }

      


}
