import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Rideoffer } from '../model/rideoffer';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Time } from '@angular/common';
import { FirebaseApp } from '@angular/fire';
import * as moment from 'moment';

@Component({
  selector: 'app-rides',
  templateUrl: './rides.page.html',
  styleUrls: ['./rides.page.scss'],
})
export class RidesPage implements OnInit {

  pickup: string;
  destination: string;
  date: string;
  time: string;
  today: string
  passenger: number;
  fee: string;
  id: string;
  username: string;
  isDriver: boolean;
  id2: string;
  phoneno: string;
  userid: string;
  name: string;
  mainuser:AngularFirestoreDocument;
  sub


  private collection: AngularFirestoreCollection;

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
    public router: Router,
    public navCtrl: NavController,
    public alert: AlertController,
    public firebase: FirebaseApp,
		) { 
        this.collection = afstore.collection('rideoffers');
        this.id = this.afstore.createId();
        this.id2 = this.id
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
      
      this.mainuser = afstore.doc(`users/${user.getUID()}`)
      this.userid = user.getUID() 
			this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.name = event.name
      this.phoneno = event.phoneno
      // this.phoneno = event.phoneno
    });
    }

  ngOnInit() {
  }
  
  addoffer (){
    this.afstore
    const {pickup, destination, passenger, fee, id, date, time, phoneno, userid, name} = this
    const rideoffer: Rideoffer = {pickup, destination, date, time, passenger, fee,phoneno,userid,name};
    try{
      this.saveToMyOffer()
    }
    finally{
    this.collection.doc(id).set(rideoffer)
    .then(()=> {~ ``
      this.showAlert("Yeayyy!","Offer Added")
      this.pickup="";
      this.destination="";
      this.date=null;
      this.time=null;
      this.passenger=null;
      this.fee="";
    })
  }}

  

  async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ['OK']
		})

		await alert.present()
  }

  saveToMyOffer(){
    const {pickup, destination, date, time, passenger, fee, id2,name,userid,phoneno} = this
    const rideoffer: Rideoffer = {pickup, destination, date, time, passenger, fee,phoneno,userid,name};
    this.afstore.doc("users/"+this.user.getUID()+"/myOffer/"+ this.id2).set(rideoffer)
  }


  // compareDate(date){
  //   var formatedMonth = date.substring(5, 6).
  //   console.log(formatedMonth)
  //   var formatedDay = date.substring(8, 9);
  //   console.log(formatedDay)
  //     var nowMonth = new Date()
  //     var nowDay = new Date().getDay
  //     if(nowMonth<formatedMonth){
  //       if(nowDay<formatedDay){
  //         return this.showAlert('Error','Post offer at least a day later.')
  //       }
  //     }
  // }
  
  
}