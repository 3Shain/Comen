import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: 'legacy/:id', loadChildren: () => import('./alpha/alpha.module').then(m => m.AlphaModule) },
  { path: 'alpha/:id', loadChildren: () => import('./gkd/gkd.module').then(m => m.GkdModule) },
  { path: 'gkd/:id', loadChildren: () => import('./gkd/gkd.module').then(m => m.GkdModule) },
  { path: 'viewer/:id', component: ViewerComponent },
  { path: 'official', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
  /*{
    path: '', loadChildren: ()=> environment.official?import('./index/index.module').then(m => m.IndexModule)
      :import('./index-local/index-local.module').then(m => m.IndexLocalModule)
  },*/
  { path: '', loadChildren: () => import('./index/index.module').then(m => m.IndexModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
