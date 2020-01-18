import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SaleHeader, Select2Data } from '../models/acb-model';

const ApiUrl = "api/Sale";
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }

  add(entity){
    console.log(entity);
    return this.http.post(`${ApiUrl}/addSale`, entity);
  }
  update(entity){
    return this.http.put(`${ApiUrl}/updateSale`, entity);
  }
  delete(id){
    return this.http.delete(`${ApiUrl}/deleteSale/${id}`)
  }

  getAll(){
    return this.http.get<SaleHeader[]>(`${ApiUrl}/getSale`)
  }

  findById(id){
    return this.http.get<SaleHeader>(`${ApiUrl}/getSaleHeaderById?soId=${id}`);
  }

  getSaleById(id){
    return this.http.get(`${ApiUrl}/findSaleById?soId=${id}`)
  }

  getProducts(){
    return this.http.get<Select2Data>(`${ApiUrl}/getProducts`)
  }
  getCustomers(){
    return this.http.get<Select2Data>(`${ApiUrl}/getCustomers`)
  }
}
