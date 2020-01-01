import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    LoginComponent,
    ProductComponent,
    CustomerComponent,
    SaleComponent
  ],
  imports: [
    HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
