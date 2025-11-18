import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CowsRoutingModule } from './cows-routing.module';

import { CowListComponent } from './components/cow-list/cow-list.component';
import { CowDetailComponent } from './components/cow-detail/cow-detail.component';
import { CowFormComponent } from './components/cow-form/cow-form.component';
import { CowFiltersComponent } from './components/cow-filters/cow-filters.component';

@NgModule({
  declarations: [
    CowListComponent,
    CowDetailComponent,
    CowFormComponent,
    CowFiltersComponent
  ],
  imports: [
    SharedModule,
    CowsRoutingModule
  ]
})
export class CowsModule {}
