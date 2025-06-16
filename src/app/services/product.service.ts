import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }
  
  getData(){
    this.http.get('https://dummyjson.com/products').subscribe()
  }

  // Get all products
  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get product by ID  
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  // Update product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
