import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './components/common/layouts/basic/basic.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { BlankComponent } from './components/common/layouts/blank/blank.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { CustomerComponent } from './views/customer/customer.component';
import { SaleComponent } from './views/sale/sale.component';
import { ProductComponent } from './views/product/product.component';
import { SaleDetailComponent } from './views/sale-detail/sale-detail.component';


const routes: Routes = [
  { path: '', redirectTo: 'mainView', pathMatch: 'full' },
  {
    path: '', component: BasicComponent,
    children: [
      { path: 'mainView', component: DashboardComponent },
      { path: 'customerView', component: CustomerComponent },
      { path: 'productView', component: ProductComponent },
      { path: 'saleView', component: SaleComponent },
      { path: 'saleDetailView/:id', component: SaleDetailComponent }
    ]
  },
  {
    path: '', component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '404', component: NotFoundComponent }
    ]
  },
// Handle all other routes
{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
