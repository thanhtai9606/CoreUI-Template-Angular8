import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic/basic.component';
import { BlankComponent } from './blank/blank.component';
import { TopnavbarModule } from '../topnavbar/topnavbar.module';
import { AsideMenuModule } from '../aside-menu/aside-menu.module';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [BasicComponent, BlankComponent],
  imports: [
    CommonModule,
    TopnavbarModule,
    AsideMenuModule,
    NavigationModule,
    RouterModule
  ]
})
export class LayoutsModule { }
