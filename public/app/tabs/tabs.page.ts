import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

	@ViewChild('tabs', {static: true}) tabs: IonTabs
	hasVerifiedEmail = true

	isDriver: boolean
	constructor(public afAuth: AngularFireAuth,) {
		firebase.auth().onAuthStateChanged(user =>{
			if(user){
			  firebase
			.firestore()
			.doc(`users/${user.uid}`)
			.get()
			.then(usersSnapshot => {
			  this.isDriver = usersSnapshot.data().isDriver;
			});
		  }
		});
	 }

	ngOnInit() {
		this.tabs.select('findtrip')
	}
}
