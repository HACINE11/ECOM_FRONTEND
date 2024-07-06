import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private smsApiUrl = 'http://127.0.0.1:9090/client/';

  constructor(private http: HttpClient) {}

  sendSms(phoneNumber: string, message: string): Observable<any> {
    const payload = { phoneNumber, message };
    return this.http.post<any>(this.smsApiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400 && error.error.error) {
        errorMessage = error.error.error;
      } else if (error.status === 500 && error.error.error) {
        errorMessage = error.error.error;
      }
    }
    return throwError(errorMessage);
  }
}
