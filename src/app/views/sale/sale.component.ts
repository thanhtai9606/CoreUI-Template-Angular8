import { Component, OnInit } from '@angular/core';
import { SaleHeader, Product, SaleProduct, Customer } from 'src/app/models/acb-model';
import { NgForm } from '@angular/forms';
import { OperationResult } from 'src/app/helpers/operationResult';
import { SaleService } from 'src/app/services/sale.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  sales: any;
  sale: SaleHeader;
  saleSubProduct: SaleProduct;
  saleProducts: any =[];
  operationResult: OperationResult;
  isUpdate: boolean = false;
  customers: Customer[];//Array<Select2OptionData>;
  products: Product[]; //Array<Select2OptionData>;
  options: Options;
  totalLine : number = 0;
  productItem?: Product;
  
  constructor(private saleService: SaleService, 
              private customerService: CustomerService,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
    // this.saleService.getProducts().subscribe(res=>{
    //   this.products = res as any;
    // })
    // this.saleService.getCustomers().subscribe(res=>{
    //   this.customers = res as any;
    // })
    this.resetForm();
    this.refreshGrid();
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
  onSelectedChanged(){
   this.productItem = this.products.find(p=>p.ProductId == this.saleSubProduct.ProductId);
  }
  addSaleProductTable()
  {       

    this.saleSubProduct.ProductId = + this.saleSubProduct.ProductId;
    this.saleSubProduct.Price = this.saleSubProduct.Price * 1000;
    this.saleSubProduct.TotalAmount = this.saleSubProduct.Quantity * this.saleSubProduct.Price;
    this.saleSubProduct.ProductName = this.productItem.ProductName; 
    this.saleProducts.push(this.saleSubProduct);
    this.resetSaleProduct();
  }
  resetSaleProduct(){
    this.saleSubProduct={
      ProductId: 0,
      ProductName :'',
      Quantity: 0,
      Price: 0,
      TotalAmount: 0
    }
  }
  removeSaleProduct(id)
  {
   this.saleProducts.splice(this.saleProducts.indexOf(id), 1);
    
  }
  save() {
    if (!this.isUpdate)
    {
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
