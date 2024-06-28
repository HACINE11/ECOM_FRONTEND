
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrlClient = 'http://127.0.0.1:9090/client/';

  constructor(private http: HttpClient) { }

  getClientStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrlClient);
  }
}