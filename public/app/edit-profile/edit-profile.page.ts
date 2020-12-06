import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.page.html',
	styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

	mainuser: AngularFirestoreDocument
	sub
	username: string
	profilePic: string
	phoneno: string
	password: string
	newpassword: string

	busy: boolean = false

	@ViewChild('fileBtn' , {static: true}) fileBtn: {
		nativeElement: HTMLInputElement
	}

	constructor(
		private http: Http, 
		private afs: AngularFirestore,
		private router: Router,
		private alertController: AlertController,
		private user: UserService) {
		this.mainuser = afs.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.username = event.username
			
		})
	}

	ngOnInit() {
	}


	

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async updateDetails() {

		if(!this.password) {
			return this.presentAlert('Error!', 'You have to enter a password')
		}

		try {
			await this.user.reAuth(this.user.getUsername(), this.password)
		} catch(error) {
			return this.presentAlert('Error!', error)
		}

		if(this.newpassword) {
			await this.user.updatePassword(this.newpassword)
		}

		// if(this.username !== this.user.getUsername()) {
		// 	await this.user.updateEmail(this.username)
		// 	this.mainuser.update({
		// 		username: this.username
		// 	})
		// }
	

		this.password = ""
		this.newpassword = ""
		

		await this.presentAlert('Done!', 'Your profile was updated!')

		this.router.navigate(['/tabs'])
	}



}
