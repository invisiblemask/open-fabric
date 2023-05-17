import { Injectable } from '@angular/core';
import { Product } from '../product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environemt.prod';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/products`);
  }

  getProduct(_id: any): Observable<Product> {
    return this.http.get<Product>(`${url}/products/${_id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${url}/products` + '/add', data);
  }

  updateProductById(_id: any, data: any): Observable<any> {
    console.log(_id, data);
    return this.http.put(`${url}/products/${_id}/` + 'edit', data);
  }
}
