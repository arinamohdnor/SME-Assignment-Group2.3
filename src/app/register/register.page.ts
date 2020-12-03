import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from '../model/User'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	phoneno: string = ""
	password: string = ""
	cpassword: string = ""
	isDriver: boolean = false
	isRequestDriver: boolean = false
	blocked: boolean = false
	hasVerifiedEmail = true
  	sentTimestamp

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router,
		public firebase: FirebaseApp  
		) { 
			this.afAuth.authState.subscribe(user => {
				if (user)
				  this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
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

	async register() {
		//const { username, password, cpassword } = this
		
		if(!this.username.includes("@siswa.um.edu.my")) {
			this.presentAlert("","Only siswamail is allowed for sign up")
			this.username = "";
		  } else if(this.password != this.cpassword){
			this.presentAlert("Password don't match", "Re-check your passwords");
			this.password = "";
			this.cpassword = "";
		  } else {
			this.saveUsers(this.username, this.password)
			.then(() => {
			  this.SendVerificationMail().then(() => {
				this.presentAlert('Email sent!','Check your siswamail to verify.');
			}).then(() => {
				this.router.navigate(['/login']);
			})
			  
			});
		  }
		}
		
	  
		

		saveUsers(username: string, password: string){
			return new Promise((resolve, reject) => {
			  this.afAuth.auth.createUserWithEmailAndPassword(username, password)
			  .then(output => {
				this.addUserToDB(output);
				resolve(output);
			  })
			  .catch(output => {
				this.presentAlert("Ops! ","");
				reject(output);
			  });
			});
		  }
		
		  addUserToDB(userCredential: firebase.auth.UserCredential){
			var username = userCredential.user.email;
			var name1 = username.split("@");
			var user:User = {
			  username: userCredential.user.email,
			  uid: userCredential.user.uid,
			  name: name1[0],
			  isDriver: false,
			  isRequestDriver: false,
			  blocked: false,
			  phoneno: '6' + this.phoneno
			}
			this.afstore.collection("users").doc(user.uid).set(user)
			.then(() => {});
		  }
			
			

	

	SendVerificationMail() {
		let user = this.getCurrentUser();
    	return user.sendEmailVerification()
	  }
	
	getCurrentUser() {
	return this.firebase.auth().currentUser;
	}

}
