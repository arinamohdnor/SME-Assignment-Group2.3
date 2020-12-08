import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FirebaseApp } from '@angular/fire';
import { getLocaleDateFormat } from '@angular/common';
import moment from 'moment'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<any>;
  drivers: Observable<any>;
  admins: Observable<any>;


  constructor(
    private afstore: AngularFirestore,
    public navc: NavController,
    public user:UserService,
    public firebase: FirebaseApp,
    public alertController : AlertController,
    ) { 
      this.usersCollection = afstore.collection<User>('users');
      this.users = this.afstore.collection('users', ref => ref.where('isDriver', '==', false).where('isAdmin', '==', false)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      
      this.drivers = this.afstore.collection('users', ref => ref.where('isDriver', '==', true).where('isAdmin', '==', false) ).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.admins = this.afstore.collection('users', ref => ref.where('isAdmin', '==', true)).snapshotChanges().pipe(
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
        .get();
        // .then(usersSnapshot => {
        //   this.isDriver = usersSnapshot.data().isDriver;
        //   });
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

  ngOnInit() {
  }

}
