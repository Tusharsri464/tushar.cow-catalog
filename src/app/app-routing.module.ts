import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cows'
  },
  {
    path: 'cows',
    loadChildren: () => import('./cows/cows.module').then(m => m.CowsModule)
  },
  {
    path: '**',
    redirectTo: 'cows'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
