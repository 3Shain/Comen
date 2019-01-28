import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaComponent } from './alpha/alpha.component'
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path:'alpha',component:AlphaComponent,pathMatch:'full' },
  { path:'',component:IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
