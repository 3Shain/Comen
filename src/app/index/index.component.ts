import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  entrys:Array<any>;

  constructor(@Inject(PLATFORM_ID) private plat: Object,private http:HttpClient) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.plat)) {
      return;
    }
    this.http.get<Array<any>>(`${environment.api_server}/history`).subscribe(
      resp=>{
        this.entrys=resp;
      }
    )
  }

  getImageUrl(uid){
    return environment.api_server+'/avatar/'+uid;
  }

  getTimeString(time){
    return  (new Date(time)).toLocaleDateString()+' '+(new Date(time)).toLocaleTimeString();
  }
}
