import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environemt.prod';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProduct(): Observable<any> {
    return this.http.get(`${API_URL}/products`, { responseType: 'text' });
  }
}
