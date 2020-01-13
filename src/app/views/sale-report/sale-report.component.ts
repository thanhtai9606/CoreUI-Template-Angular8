import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { SaleService } from 'src/app/services/sale.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { SaleHeader } from 'src/app/models/acb-model';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {
  sales?: any;
  saleHeader?: SaleHeader;
  customer?: any;
  id: number;
  constructor(private saleService: SaleService,
              private customerService: CustomerService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = parseInt(params.get("id")));
   this.loadSaleHeader();
    this.loadSaleDetail();
  }

  loadSaleDetail() {
    this.saleService.getSaleById(this.id).subscribe(res => {
      this.sales = res;
    })
  }
  loadCustomerDetail(id){
    this.customerService.findById(id).subscribe(res=> {
      this.customer = res[0]
      console.log('customer '+ JSON.stringify(res));
    })
  }
  loadSaleHeader()
  {
    // this.saleService.findById(this.id).subscribe(res=> 
    //   {
    //     this.saleHeader = res[0] as SaleHeader;
    //     this.loadCustomerDetail(JSON.stringify(this.saleHeader.CustomerId));
    //     console.log('saleHeader '+ JSON.stringify(this.saleHeader[0].CustomerId));
    //   })
      this.saleService.findById(this.id).toPromise()
          .then(res=> 
            {
              this.saleHeader = res[0] as SaleHeader;
              this.loadCustomerDetail(JSON.stringify(this.saleHeader.CustomerId));
              console.log('saleHeader '+ JSON.stringify(this.saleHeader.CustomerId));
            })
  
  }


}
