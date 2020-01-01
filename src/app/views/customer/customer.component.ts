import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Customer } from 'src/app/models/acb-model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer;

  constructor(private customerApi: CustomerService) { }

  ngOnInit() {
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.customer={
        CustomerID: null,
        CustomerName: '',
        Phone: '',
        Address: '',
        ModifiedDate: null

      }
  }
  add(){
    this.customerApi.add(this.customer);
  }

}
