import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Customer } from 'src/app/models/acb-model';
import { OperationResult } from 'src/app/helpers/operationResult';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer;
  customers: Customer[];
  operationResult: OperationResult;
  isUpdate: boolean = false;

  constructor(private customerApi: CustomerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshGrid();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.customer = {
      CustomerId: 0,
      CustomerName: '',
      Phone: '',
      Address: ''
    }
    this.isUpdate = false;
  }
  edit(id) {
    this.isUpdate = true;
    this.customer = this.customers.find(s => s.CustomerId == id);
    console.log(this.customer);

  }
  save() {
    if (!this.isUpdate)
      this.customerApi.add(this.customer).subscribe(res => this.messageRespone(res));
    else
      this.customerApi.update(this.customer).subscribe(res => this.messageRespone(res));
  }
  //Respone Message after execute
  messageRespone(res: any) {
    this.operationResult = res as OperationResult;
    if (this.operationResult.Success) {
      this.toastr.success(this.operationResult.Message, this.operationResult.Caption);
      this.resetForm();
      this.refreshGrid();
    } else
      this.toastr.error(this.operationResult.Message, this.operationResult.Caption);
  }
  delete(id: number) {
    console.log(id);
    this.customerApi.delete(id).subscribe(res => this.messageRespone(res));
  }
  refreshGrid() {
    this.customerApi.getAll().subscribe((res) => {
      this.customers = res as Customer[];
    });
  }

}
