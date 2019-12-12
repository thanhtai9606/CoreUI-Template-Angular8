import { Component, OnInit } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    $('body').removeClass('header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show pace-done pace-done');
    $('body').addClass('flex-row align-items-center');
  
  }
  

}
