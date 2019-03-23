import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlphaComponent } from './alpha/alpha.component';
import { IndexComponent } from './index/index.component';
import { ViewerComponent } from './viewer/viewer.component';
import { environment } from '../environments/environment';
import { IndexLocalComponent } from './index-local/index-local.component';

const routes: Routes = [
  { path: 'alpha/:id', component: AlphaComponent},
  { path: 'viewer/:id', component: ViewerComponent},
  { path: 'offcial', component: IndexComponent},
  { path: '', component: environment.official?IndexComponent:IndexLocalComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
