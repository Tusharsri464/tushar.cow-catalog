import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  providers: []
})
export class CoreModule {
  // Guard against re-importing core module
  constructor(@Optional() @SkipSelf() parentModule: CoreModule | null) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
