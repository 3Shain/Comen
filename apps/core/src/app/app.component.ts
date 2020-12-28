import { ApplicationRef, Component, ɵdetectChanges} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'comen-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'core';

  constructor(private app: ApplicationRef,
    private router:Router){
      /**
       * temporary workaround for zoneless router
       */
      router.events.subscribe((event)=>{
        if(event instanceof NavigationEnd){
          // app.tick();
          ɵdetectChanges(this);
        }
      });
  }
}
