import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Rideoffer } from '../model/rideoffer';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FirebaseApp } from '@angular/fire';
import { getLocaleDateFormat } from '@angular/common';
import moment from 'moment'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-findtrip',
  templateUrl: './findtrip.page.html',
  styleUrls: ['./findtrip.page.scss'],
})
export class FindtripPage implements OnInit {
  pickup: string;
  destination: string;
  date: String;
  time: String;
  today: String
  passenger: number;
  fee: string;
  id: string;
  phoneno: string;
  userid: string;
  name: string;
  mainuser:AngularFirestoreDocument;
  sub
  username: string

  private rideofferCollection: AngularFirestoreCollection<Rideoffer>;
  rideoffers: Observable<any>;
  isDriver: boolean

  constructor(
    private afstore: AngularFirestore,
    public navc: NavController,
    public user:UserService,
    public firebase: FirebaseApp,
    public alertController : AlertController,
    ) { 
      this.rideofferCollection = afstore.collection<Rideoffer>('rideoffers');
      this.rideoffers = this.afstore.collection('rideoffers').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
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
      // this.mainuser = afstore.doc(`rideoffers/${user.getUID()}`)
			// this.sub = this.mainuser.valueChanges().subscribe(event => {
      // this.phoneno = event.phoneno 
      // console.log(this.phoneno)
      // var link = 'https://wa.me/'+ this.phoneno
      // console.log(link)
		//})
    }
  
    navigateToChat(value) {
      window.open('https://wa.me/'+ value)
    }
  
    ngOnInit() {
    }


    goToRides() {
      return this.navc.navigateForward(['/rides']);
    }

    saveToMyRequest(value){
      this.afstore.doc("users/"+this.user.getUID()+"/myRequest/"+value.id).set({
        pickup:  value.pickup,
        destination: value.destination,
        date: value.date,
        time : value.time,
        passenger: value.passenger,
        fee : value.fee,
        userid : value.userid,
        phoneno : value.phoneno,
        name : value.name,
        isApprove: false,
      }).then(()=>{
        this.afstore.collection('rideoffers').doc(value.id).collection('requestList').doc("" + this.afstore.createId()).set({
          isApproved: false,
          userid: this.user.getUID(),
          username: this.user.getUsername()
        }).then(()=>{
          this.presentAlert("Saved to My Request","Wait for driver approval")
        })
        
      })
    }

    async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })
  
      await alert.present()
    }

    // const searchbar = document.querySelector('ion-searchbar');
    // const items = Array.from(document.querySelector('ion-list').children);
    
    // searchbar.addEventListener('ionInput', handleInput);
    // function handleInput(event) {
    //   const query = event.target.value.toLowerCase();
    //   requestAnimationFrame(() => {
    //     items.forEach(item => {
    //       const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
    //       item.style.display = shouldShow ? 'block' : 'none';
    //     });
    //   });
    // }

}
