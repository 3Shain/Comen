import { Component, OnInit } from '@angular/core';
import { BiliwsService } from '../biliws.service';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css']
})
export class AlphaComponent implements OnInit {

  constructor(private bili:BiliwsService) { }

  ngOnInit() {
    this.bili.initial(7788489);
  }

}
