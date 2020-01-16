import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';
import { CustomerComponent } from './views/customer/customer.component';
import { SaleComponent } from './views/sale/sale.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'node_modules/ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import { SaleDetailComponent } from './views/sale-detail/sale-detail.component';
import { POSComponent } from './views/pos/pos.component';
import { SaleReportComponent } from './views/sale-report/sale-report.component';
import { DatePipe, CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    LoginComponent,
    ProductComponent,
    CustomerComponent,
    SaleComponent,
    SaleDetailComponent,
    POSComponent,
    SaleReportComponent
  ],
  imports: [
    HttpClientModule,
    NgSelect2Module,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    SweetAlert2Module.forRoot(),
    LayoutsModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
