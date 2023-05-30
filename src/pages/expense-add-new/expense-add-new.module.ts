import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseAddNewPage } from './expense-add-new';

@NgModule({
  declarations: [
    ExpenseAddNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseAddNewPage),
  ],
})
export class ExpenseAddNewPageModule {}
