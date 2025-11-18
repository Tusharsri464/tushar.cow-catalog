import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CowListComponent } from './components/cow-list/cow-list.component';
import { CowFormComponent } from './components/cow-form/cow-form.component';
import { CowDetailComponent } from './components/cow-detail/cow-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CowListComponent
  },
  {
    path: 'new',
    component: CowFormComponent
  },
  {
    path: ':id',
    component: CowDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CowsRoutingModule {}
