import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestlistPageRoutingModule } from './requestlist-routing.module';

import { RequestlistPage } from './requestlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestlistPageRoutingModule
  ],
  declarations: [RequestlistPage]
})
export class RequestlistPageModule {}
