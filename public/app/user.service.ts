import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
	username: string,
	uid: string,
	phoneno: string
}

@Injectable()
export class UserService {
	private user: user
	firebase: any
	toast: any

	constructor(private afAuth: AngularFireAuth) {

	}

	setUser(user: user) {
		this.user = user
	}

	getUsername(): string {
		return this.user.username
	}

	getPhoneno(): string {
		return this.user.phoneno
	}

	reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@siswa.um.edu.my', password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}

	async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid,
				phoneno: ""

			})

			return true
		}
		return false
	}

	getUID(): string {
		return this.user.uid
	}
	
	sendVerificationEmail(){
		let user = this.getCurrentUser();
		user.sendEmailVerification();
		// this.toast.showToast("An email has been sent to "+user.email+" for verification");
		this.toast.showToast("You are just one step away! A verification email has been sent to "+user.email+".");
	  }
	  getCurrentUser() {
		return this.firebase.auth().currentUser;
	  }
}