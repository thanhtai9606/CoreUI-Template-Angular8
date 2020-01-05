import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Sale, Select2Data } from '../models/acb-model';

const ApiUrl = "api/Sale";
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  add(entity){
    return this.http.post(`${ApiUrl}/addSale`, entity);
  }
  update(entity){
    return this.http.put(`${ApiUrl}/updateSale`, entity);
  }
  delete(id){
    return this.http.delete(`${ApiUrl}/deleteSale`, id)
  }

  getAll(){
    return this.http.get<Sale[]>(`${ApiUrl}/getSale`)
  }

  findById(id){
    return this.http.get<Sale>(`${ApiUrl}/findSale`,id)
  }

  getProducts(){
    return this.http.get<Select2Data>(`${ApiUrl}/getProducts`)
  }
  getCustomers(){
    return this.http.get<Select2Data>(`${ApiUrl}/getCustomers`)
  }
}
