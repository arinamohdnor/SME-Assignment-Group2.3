import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Camera} from '@ionic-native/camera/ngx'
import { AngularFireStorageModule } from "@angular/fire/storage";
import { IonicStorageModule } from "@ionic/storage";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { HttpModule } from '@angular/http'
import { UserService } from './user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ShareModule } from './share.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	  BrowserModule, 
	  IonicModule.forRoot(), 
	  AppRoutingModule,
	  AngularFireModule.initializeApp(firebaseConfig),
	  AngularFireAuthModule,
	  AngularFirestoreModule,
	  HttpModule,
	  IonicStorageModule,
	  AngularFireStorageModule,
	  AgmCoreModule.forRoot({
		apiKey: 'AIzaSyAKB8UlcI80vG3xHSwbiM8xSzCXakJoPc8'
	  }),
	  ShareModule
	],
  providers: [
	Camera,
    StatusBar,
    SplashScreen,
	{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	UserService,
	AuthService,
	
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}