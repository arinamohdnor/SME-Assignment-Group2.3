import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.page.html',
  styleUrls: ['./resetpw.page.scss'],
})
export class ResetpwPage implements OnInit {

  username

  constructor(
    public alert: AlertController,
    public router: Router,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async forgotPassword() {
    const { username} = this
    try {
      await this.afAuth.auth.sendPasswordResetEmail(username);
      this.showAlert("Done!", "Check your email for password reset")

    } catch (err) {
      console.dir(err);
      this.showAlert("Error", "Please enter a valid e-mail")

    }
  }
  
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK."]
    })

    await alert.present()
  }
}