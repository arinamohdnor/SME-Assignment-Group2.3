import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditofferPage } from './editoffer.page';

const routes: Routes = [
  {
    path: '',
    component: EditofferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditofferPageRoutingModule {}
