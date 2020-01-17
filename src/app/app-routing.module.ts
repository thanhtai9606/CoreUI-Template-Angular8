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
import { POSComponent } from './views/pos/pos.component';
import { SaleReportComponent } from './views/sale-report/sale-report.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'mainView', pathMatch: 'full' },
  {
    path: '', component: BasicComponent,
    children: [
      { path: 'mainView', component: DashboardComponent,canActivate: [AuthGuard] },
      { path: 'customerView', component: CustomerComponent,canActivate: [AuthGuard] },
      { path: 'productView', component: ProductComponent,canActivate: [AuthGuard] },
      { path: 'saleView', component: SaleComponent,canActivate: [AuthGuard] },
      { path: 'saleDetailView/:id', component: SaleDetailComponent,canActivate: [AuthGuard] },    
      { path: 'posView', component: POSComponent,canActivate: [AuthGuard] }
    ]
  },
  {
    path: '', component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '404', component: NotFoundComponent },
      { path: 'saleReportView/:id', component: SaleReportComponent }
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
