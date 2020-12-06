import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Rideoffer } from '../model/rideoffer';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-myrequest',
  templateUrl: './myrequest.page.html',
  styleUrls: ['./myrequest.page.scss'],
})
export class MyrequestPage implements OnInit {

  private rideofferCollection: AngularFirestoreCollection<Rideoffer>;
  rideoffers: Observable<any>;
  isDriver: boolean;

  constructor(
    private afStore: AngularFirestore,
    public navc: NavController,
    public user:UserService,
    public firebase: FirebaseApp,
    ) { 
      this.rideoffers = this.afStore.collection('users').doc(this.user.getUID()).collection('myRequest').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data();
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
    }
  
    navigateToChat(value) {
      window.open('https://wa.me/'+ value.phoneno)
    }
  
    ngOnInit() {
    }

    

}