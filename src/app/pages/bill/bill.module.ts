import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPageRoutingModule } from './bill-routing.module';

import { BillPage } from './bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPageRoutingModule
  ],
  declarations: [BillPage]
})
export class BillPageModule {}
