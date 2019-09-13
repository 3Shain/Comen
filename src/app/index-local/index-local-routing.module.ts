import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexLocalComponent } from './index-local.component';

const routes: Routes = [{
  path:'',
  component: IndexLocalComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexLocalRoutingModule { }
