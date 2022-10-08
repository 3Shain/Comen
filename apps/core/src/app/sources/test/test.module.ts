import { NgModule } from '@angular/core';
import { TestSource } from './test';

@NgModule({
  providers: [TestSource],
})
export class TestSourceModule {
  source = TestSource;
}
