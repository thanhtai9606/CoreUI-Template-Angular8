import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/acb-model';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationResult } from 'src/app/helpers/operationResult';
import $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : Product[];
  product : Product;
  operationResult: OperationResult;
  isUpdate: boolean = false;
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshGrid();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.product = {
      ProductId: 0,
      ProductName: '',
      Inventory: 0,
      Model:'',
      Warranty: 0

    }
    this.isUpdate = false;
  }
  edit(id) {
    console.log(id);
    this.isUpdate = true;
    this.product = this.products.find(s => s.ProductId == id);

  }
  add(){
    this.resetForm();
    this.isUpdate = false;

  }
  save() {
    if (!this.isUpdate)
      this.productService.add(this.product).subscribe(res => this.messageRespone(res));
    else
      this.productService.update(this.product).subscribe(res => this.messageRespone(res));
  }
  //Respone Message after execute
  messageRespone(res: any) {
    this.operationResult = res as OperationResult;
    if (this.operationResult.Success) {
      this.toastr.success(this.operationResult.Message, this.operationResult.Caption);
      this.resetForm();
      this.refreshGrid();
      $("#myModal").modal("hide");
    } else
      this.toastr.error(this.operationResult.Message, this.operationResult.Caption);
  }
  closeModal(){
    this.resetForm();
  }
  delete(id: number) {
    console.log(id);
    this.productService.delete(id).subscribe(res => this.messageRespone(res));
  }
  refreshGrid() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

}
