import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ApiUrl = "api/Dashboard";
@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor( private http: HttpClient) { }

  Profit = (options) => this.http.get<any>(`${ApiUrl}/GetProfit?options=${options}`);
  Customer = () => this.http.get<any>(`${ApiUrl}/GetCustomer`);
  Inventory = () => this.http.get<any>(`${ApiUrl}/GetInventory`);
  Sale = (options) => this.http.get<any>(`${ApiUrl}/GetSaleOrder?options=${options}`);
  
}
