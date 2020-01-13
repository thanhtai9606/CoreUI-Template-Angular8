import { Component, OnInit } from '@angular/core';
import { SaleHeader, SaleProduct, Customer, Product } from 'src/app/models/acb-model';
import { OperationResult } from 'src/app/helpers/operationResult';
import { SaleService } from 'src/app/services/sale.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class POSComponent implements OnInit {
  sales: any;
  sale: SaleHeader;
  saleSubProduct: SaleProduct;
  saleProducts: any = [];
  operationResult: OperationResult;
  isUpdate: boolean = false;
  customers: Customer[];//Array<Select2OptionData>;
  products: Product[]; //Array<Select2OptionData>;
  options: Options;
  subTotal: number = 0;
  productItem?: Product;

  constructor(private saleService: SaleService,
    private customerService: CustomerService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
    this.saleService.getProducts().subscribe(res => {
      this.products = res as any;
    })
    this.saleService.getCustomers().subscribe(res => {
      this.customers = res as any;
    })
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.sale = {
      SoId: 0,
      CustomerId: 0,
      Tax: 0.0,
      Discount: 0.0,
      SubTotal: 0,
      TotalLine: 0,
      CreateBy: '',

      // SaleDetails: []

    }
    this.resetSaleProduct();
    this.isUpdate = false;

  }
  edit(id) {
    this.isUpdate = true;
    //this.sale = this.customers.find(s => s.CustomerId == id);
    //debugger;

  }
  onSelectedChanged() {
    this.productItem = this.products.find(p => p.ProductId == this.saleSubProduct.ProductId);
  }
  addSaleProductTable() {
    this.subTotal = 0;
    this.saleSubProduct.ProductId = + this.saleSubProduct.ProductId;

    this.saleSubProduct.Price = this.saleSubProduct.Price * 1000;
    // let currentSubProduct =  this.saleProducts.find(p=>p.ProductId == this.saleSubProduct.ProductId);
    // console.log(currentSubProduct);
    // if( currentSubProduct >0)
    // {
    //   this.saleSubProduct.Quantity += currentSubProduct.Quantity
    // }
    this.saleSubProduct.TotalAmount = this.saleSubProduct.Quantity * this.saleSubProduct.Price;
    this.saleSubProduct.ProductName = this.productItem.ProductName;
    this.saleProducts.push(this.saleSubProduct);
    this.saleProducts.forEach(product => {
      this.subTotal += product.TotalAmount;
    });
    this.resetSaleProduct();
  }
  removeItemInProduct() {
    let item = this.products.find(p => p.ProductId == this.saleSubProduct.ProductId);
   console.log(item);
    if (item !=null) {
      this.products.splice(this.products.indexOf(item), 1);
    }
  }
  onChangeValues() {
    let tax = (this.subTotal * this.sale.Tax * 0.01)
    let discount = (this.subTotal + tax) * this.sale.Discount * 0.01;
    this.sale.TotalLine = (this.subTotal + tax) - discount;
  }
  resetSaleProduct() {
    this.saleSubProduct = {
      ProductId: 0,
      ProductName: '',
      Quantity: 1,
      Price: 1,
      TotalAmount: 0
    }
    this.onChangeValues();
   // this.removeItemInProduct();
  }
  removeSaleProduct(id) {
    this.saleProducts.splice(this.saleProducts.indexOf(id), 1);

  }
  save() {
    if (!this.isUpdate) {
      this.sale.SaleDetails = this.saleProducts;
      this.sale.CustomerId = + this.sale.CustomerId;
      this.saleService.add(this.sale).subscribe(res => this.messageRespone(res));
    }

    else
      this.saleService.update(this.sale).subscribe(res => this.messageRespone(res));
  }

  //Respone Message after execute
  messageRespone(res: any) {
    console.log(res);
    this.operationResult = res as OperationResult;
    if (this.operationResult.Success) {
      this.toastr.success(this.operationResult.Message, this.operationResult.Caption);
      this.resetForm();
      this.router.navigate(['saleView']);
    } else
      this.toastr.error(this.operationResult.Message, this.operationResult.Caption);
  }
  delete(id: number) {
    console.log(id);
    this.saleService.delete(id).subscribe(res => this.messageRespone(res));
  }
}
