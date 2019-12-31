import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { ProductComponent } from './views/product/product.component';
import { CustomerComponent } from './views/customer/customer.component';
import { SaleComponent } from './views/sale/sale.component';

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
    BrowserModule,
    AppRoutingModule,
    LayoutsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
