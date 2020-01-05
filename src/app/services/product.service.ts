import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../models/acb-model';

const ApiUrl = "api/Product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  add(entity){
    return this.http.post(`${ApiUrl}/addProduct`, entity);
  }
  update(entity){
    return this.http.put(`${ApiUrl}/updateProduct`, entity);
  }
  delete(id){
    return this.http.delete(`${ApiUrl}/deleteProduct/${id}`)
  }

  getAll(){
    return this.http.get<Product[]>(`${ApiUrl}/getProduct`)
  }

  findById(id){
    return this.http.get<Product>(`${ApiUrl}/findProduct`,id)
  }
}
