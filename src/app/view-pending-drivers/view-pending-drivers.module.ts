import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPendingDriversPageRoutingModule } from './view-pending-drivers-routing.module';

import { ViewPendingDriversPage } from './view-pending-drivers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPendingDriversPageRoutingModule
  ],
  declarations: [ViewPendingDriversPage]
})
export class ViewPendingDriversPageModule {}
