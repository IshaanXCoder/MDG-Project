import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillPage } from './bill.page';

const routes: Routes = [
  {
    path: '',
    component: BillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPageRoutingModule {}
