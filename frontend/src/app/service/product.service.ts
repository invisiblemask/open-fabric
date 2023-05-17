import { Injectable } from '@angular/core';
import { Product } from '../product';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8080/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }

  getProduct(_id: any): Observable<Product> {
    return this.http.get<Product>(`${url}/${_id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(url + '/add', data);
  }

  updateProductById(_id: any, data: any): Observable<any> {
    console.log(_id, data);
    return this.http.put(`${url}/${_id}/` + 'edit', data);
  }
}
