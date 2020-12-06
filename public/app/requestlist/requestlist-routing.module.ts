import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestlistPage } from './requestlist.page';

const routes: Routes = [
  {
    path: '',
    component: RequestlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestlistPageRoutingModule {}
