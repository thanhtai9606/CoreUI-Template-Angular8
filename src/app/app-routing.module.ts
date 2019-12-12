import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './components/common/layouts/basic/basic.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'mainView', pathMatch: 'full' },
  {
    path: '', component: BasicComponent,
    children: [
      { path: 'mainView', component: DashboardComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
