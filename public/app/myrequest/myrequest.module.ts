import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyrequestPageRoutingModule } from './myrequest-routing.module';

import { MyrequestPage } from './myrequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyrequestPageRoutingModule
  ],
  declarations: [MyrequestPage]
})
export class MyrequestPageModule {}
