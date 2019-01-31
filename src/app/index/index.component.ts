import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      window.location.href="https://github.com/3Shain/BiliChat";
    },5000);
  }

}
