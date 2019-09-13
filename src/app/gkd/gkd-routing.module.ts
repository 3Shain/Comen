import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GKDComponent } from './gkd.component';

const routes: Routes = [
  {
    path:'',
    component:GKDComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GkdRoutingModule { }
