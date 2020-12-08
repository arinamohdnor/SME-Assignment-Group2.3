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
  selector: 'app-view-pending-drivers',
  templateUrl: './view-pending-drivers.page.html',
  styleUrls: ['./view-pending-drivers.page.scss'],
})
export class ViewPendingDriversPage implements OnInit {

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
      
      this.drivers = this.afstore.collection('users', ref => ref.where('isRequestDriver', '==', true)).snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }

  ngOnInit() {
  }

}
