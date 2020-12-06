import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpwPageRoutingModule } from './resetpw-routing.module';

import { ResetpwPage } from './resetpw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpwPageRoutingModule
  ],
  declarations: [ResetpwPage]
})
export class ResetpwPageModule {}
