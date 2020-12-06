import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Rideoffer } from '../model/rideoffer';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseApp } from '@angular/fire';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mytrip',
  templateUrl: './mytrip.page.html',
  styleUrls: ['./mytrip.page.scss'],
})
export class MytripPage implements OnInit {

  private rideofferCollection: AngularFirestoreCollection<Rideoffer>;
  rideoffers: Observable<any>;
  isDriver: boolean;
  mainuser: AngularFirestoreDocument
  sub
  name: string
  userid: string
  phoneno

  constructor(
    private afStore: AngularFirestore,
    public navc: NavController,
    public router: Router,
    public user:UserService,
    public firebase: FirebaseApp,
    ) { 
      this.rideofferCollection = afStore.collection("users/"+this.user.getUID()+"/myOffer")
      this.rideoffers = this.afStore.collection('rideoffers').snapshotChanges().pipe(
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
    
    }
  
    navigateToChat() {
      window.open('https://wa.me/'+ this.phoneno)
    }
  
    ngOnInit() {
    }

    delete(id){
      this.afStore.doc("users/"+this.user.getUID()+"/myOffer/"+ id).delete().then(()=>{
        this.afStore.doc("rideoffers/"+id).delete()
      })
      
    }

    edit(id){
      this.router.navigate(['/editoffer',{id}]);
    }

    gotoreqlist(id){
      this.router.navigate(['/requestlist',id]);
    }



}