import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { FirebaseApp } from '@angular/fire';
import firebase from 'firebase';
import { Rideoffer } from '../model/rideoffer';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-page',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

	mainuser: AngularFirestoreDocument
	sub
	username: string
	name: string
	isRequestDriver: boolean
	pickup: string;
	destination: string;
	date: String;
	time: String;
	today: String
	passenger: number;
	fee: string;
	id: string;

	private rideofferCollection: AngularFirestoreCollection<Rideoffer>;
	rideoffers: Observable<Rideoffer[]>;
	isDriver: boolean

	constructor(
		private afs: AngularFirestore, 
		private user: UserService, 
		private router: Router,
		private afAuth: AngularFireAuth,
		private firebase: FirebaseApp 
		) {
			
			this.mainuser = afs.doc(`users/${user.getUID()}`)
			this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.name = event.name 
		})
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	
	
	signOut() {
		this.afAuth.auth.signOut().then(() => {
	   location.reload();
		});
	}
	
	

	ngOnInit() {
	}

	// driverRequest(){
	// 	this.afs.doc("users/"+this.user.getUID()).update({
	// 		isRequestDriver: true,
	// 	  })
	// }

	driverRequest(){
		this.router.navigate(['/imageuploader'])
	}

	gotoeditprofile(){
		this.router.navigate(['/edit-profile'])
	}

	gotoreport(){
		this.router.navigate(['/report'])
	}

}
