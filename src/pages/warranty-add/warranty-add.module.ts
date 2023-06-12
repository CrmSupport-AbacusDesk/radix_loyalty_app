import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarrantyAddPage } from './warranty-add';

@NgModule({
  declarations: [
    WarrantyAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WarrantyAddPage),
  ],
})
export class WarrantyAddPageModule {}
