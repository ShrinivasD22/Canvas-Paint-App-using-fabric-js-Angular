import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/saveData`, data);
  }
}
