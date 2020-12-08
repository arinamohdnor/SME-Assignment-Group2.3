import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPendingDriversPage } from './view-pending-drivers.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPendingDriversPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPendingDriversPageRoutingModule {}
