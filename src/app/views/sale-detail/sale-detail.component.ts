import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/services/sale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {
  sales : any;
  id: number;
  constructor( private saleService: SaleService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.id = parseInt(params.get("id")));
    this.loadSaleDetail();
  }

  loadSaleDetail(){
    this.saleService.getSaleById(this.id).subscribe(res=>{
      this.sales = res;
    })
  }

}
