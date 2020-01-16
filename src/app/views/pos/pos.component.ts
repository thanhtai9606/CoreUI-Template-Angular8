import { Component, OnInit } from '@angular/core';
import { SaleHeader, SaleProduct, Customer, Product } from 'src/app/models/acb-model';
import { OperationResult } from 'src/app/helpers/operationResult';
import { SaleService } from 'src/app/services/sale.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Options } from 'select2';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

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
    private currencyPipe: CurrencyPipe,
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
    this.saleSubProduct.Price = this.productItem.SalePrice;
  }
  addSaleProductTable() {
    this.subTotal = 0;
    //this.saleSubProduct.ProductId =+ this.saleSubProduct.ProductId;
    this.saleSubProduct.TotalAmount = this.saleSubProduct.Quantity * this.saleSubProduct.Price;
    this.saleSubProduct.ProductName = this.productItem.ProductName;
    this.saleProducts.push(this.saleSubProduct);
    this.saleProducts.forEach(product => {
      this.subTotal += product.TotalAmount;
    });
    this.removeItemInProduct();
    this.resetSaleProduct();

  }
  onChangeValues() {
    let tax = (this.subTotal * this.sale.Tax * 0.01)
    let discount = this.subTotal * this.sale.Discount * 0.01;
    this.sale.SubTotal = this.subTotal;
    this.sale.TotalLine = (this.subTotal + tax) - discount;
  }
  resetSaleProduct() {
    this.saleSubProduct = {
      ProductId: 0,
      ProductName: '',
      Quantity: 1,
      Price: 1000,
      TotalAmount: 0
    }
    this.onChangeValues();

  }
  checkInventory()
  {
    let current = this.products.filter(x => x.ProductId == this.saleSubProduct.ProductId)
    if(current[0].Inventory < this.saleSubProduct.Quantity){
      alert(`Số bạn nhập phải nhỏ hơn tồn kho ${current[0].Inventory} < ${this.saleSubProduct.Quantity}` )
      this.saleSubProduct.Quantity = current[0].Inventory;
    }
  }
  removeSaleProduct(id) {
    this.saleProducts.splice(this.saleProducts.indexOf(id), 1);

  }
  removeItemInProduct() {
    let current = this.saleProducts.filter(x => x.ProductId == this.saleSubProduct.ProductId)
    if (current.length > 0)
      this.products = this.products.filter(p => p.ProductId != current[0].ProductId);
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
  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "");
  }
  transformPrice() {
    this.saleSubProduct.Price = + this.formatMoney(this.saleSubProduct.Price);
  }
}
