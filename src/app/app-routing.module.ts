import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './components/common/layouts/basic/basic.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { BlankComponent } from './components/common/layouts/blank/blank.component';
import { LoginComponent } from './views/login/login.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'mainView', pathMatch: 'full' },
  {
    path: '', component: BasicComponent,
    children: [
      { path: 'mainView', component: DashboardComponent }
    ]
  },
  {
    path: '', component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '404', component: NotFoundComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
