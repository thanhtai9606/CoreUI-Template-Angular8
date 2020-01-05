import { Component, OnInit } from '@angular/core';
import { Sale, Product } from 'src/app/models/acb-model';
import { NgForm } from '@angular/forms';
import { OperationResult } from 'src/app/helpers/operationResult';
import { SaleService } from 'src/app/services/sale.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  sales: any;
  sale: Sale
  operationResult: OperationResult;
  isUpdate: boolean = false;

  constructor(private saleService: SaleService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshGrid();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.sale = {
      SoId: 0,
      CustomerId: 0,
      ProductId: 0,
      WarrantyStart: null,
      WarrantyEnd: null,
      Quantity: 0,
      ModifiedDate: null,
      CreateBy: '',
  
      Products?: Product[]

    }
    this.isUpdate = false;
  }
  edit(id) {
    this.isUpdate = true;
    //this.sale = this.customers.find(s => s.CustomerId == id);
    //debugger;

  }
  save() {
    if (!this.isUpdate)
      this.saleService.add(this.sale).subscribe(res => this.messageRespone(res));
    else
      this.saleService.update(this.sale).subscribe(res => this.messageRespone(res));
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
    this.saleService.delete(id).subscribe(res => this.messageRespone(res));
  }
  refreshGrid() {
    this.saleService.getAll().subscribe((res) => {
      this.sales = res;
    });
  }


}
