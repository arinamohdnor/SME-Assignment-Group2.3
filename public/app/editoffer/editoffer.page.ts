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
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editoffer',
  templateUrl: './editoffer.page.html',
  styleUrls: ['./editoffer.page.scss'],
})
export class EditofferPage implements OnInit {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  today: string
  passenger: number;
  fee: string;
  username: string;
  isDriver: boolean;
  id2: string;
  phoneno: string
  userid: string;
  name: string;
  mainuser:AngularFirestoreDocument;
  sub
  private collection: AngularFirestoreCollection;
  rideoffers: Observable<any>;
  id:string

  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
    public user: UserService,
    private route: ActivatedRoute,
		public alertController: AlertController,
    public router: Router,
    public navCtrl: NavController,
    public alert: AlertController,
    public firebase: FirebaseApp,
  ) { 

    this.sub = this.route.params.subscribe(params => {
    this.id = params['id'];
    })
    this.collection = afstore.collection('rideoffers');
    // this.rideoffers = this.afstore.collection('rideoffers').snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );
    
    // this.rideoffers = this.afstore.collection('users/' + this.user.getUID() +  '/myOffer').snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );
    
  }

  ngOnInit() {
  }
  
  

  async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ['OK']
		})

		await alert.present()
  }

  updateMyOffer(){  
    const {pickup,destination,date,time,passenger,fee} = this
    const userid = this.user.getUID()
    const phoneno = this.user.getPhoneno()
    const name = this.user.getUsername()
    const rideoffer: Rideoffer = {pickup, destination, date, time, passenger, fee,phoneno,userid,name};
    this.afstore.collection('users').doc(this.user.getUID()).collection('myOffer').doc("" + this.id).update(rideoffer).then(()=>{
      this.collection.doc(this.id).update(rideoffer)
    }).then(()=> {~ ``
    this.showAlert("Yeayyy!","Offer Updated.")
    this.router.navigate(['/tabs/mytrip'])
    this.pickup="";
    this.destination="";
    this.date=null;
    this.time=null;
    this.passenger=null;
    this.fee="";
  })
  }
}
