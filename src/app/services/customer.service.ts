import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/acb-model';

const ApiUrl = "api/customer";
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  add(entity){
    return this.http.post(`${ApiUrl}/addCustomer`, entity);
  }
  update(entity){
    return this.http.put(`${ApiUrl}/updateCustomer`, entity);
  }
  delete(id){
    return this.http.delete(`${ApiUrl}/deleteCustomer/${id}`)
  }

  getAll(){
    return this.http.get<Customer[]>(`${ApiUrl}/getCustomer`)
  }

  findById(id){
    return this.http.get<Customer>(`${ApiUrl}/findCustomer`,id)
  }
}
