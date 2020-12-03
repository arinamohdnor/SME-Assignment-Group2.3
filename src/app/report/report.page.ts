import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'
import { AlertController,NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  
  report: string
  id: string;
  private collection: AngularFirestoreCollection;
  mainuser: AngularFirestoreDocument
  sub
  name: string

  constructor(
    public alert: AlertController,
    public router: Router,
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
    public navCtrl: NavController,
    public firebase: FirebaseApp,
  ) {
    this.id = this.afstore.createId();
    this.collection = afstore.collection('reportList');
    this.mainuser = afstore.doc(`users/${user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
		this.name = event.name })
   }

  ngOnInit() {
  }

  sendReport(){
    this.afstore
    const {report,id,name} = this
    this.collection.doc(id).set({
      report,
      id,
      name,
    }).then(()=>{
      this.showAlert('Report Sent!','We will contact you through siswamail later. Thank you.')
    }).then(()=>{
      this.router.navigate(['/tabs/profile'])
    })
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
