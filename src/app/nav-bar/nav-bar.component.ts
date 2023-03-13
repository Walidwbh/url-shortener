import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isClicked: boolean = false
  ngOnInit(): void {

  }
  toggleClick(){
    //reverse the value only in mobile devices
    if(window.innerWidth<=768){
      this.isClicked = !this.isClicked
    }
  }
}
