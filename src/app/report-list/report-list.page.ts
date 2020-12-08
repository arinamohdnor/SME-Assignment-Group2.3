import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { FirebaseApp } from '@angular/fire';
import { getLocaleDateFormat } from '@angular/common';
import moment from 'moment'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.page.html',
  styleUrls: ['./report-list.page.scss'],
})
export class ReportListPage implements OnInit {

  reports: Observable<any>;

  constructor(
    private afstore: AngularFirestore,
    public navc: NavController,
    public user:UserService,
    public firebase: FirebaseApp,
    public alertController : AlertController,
    ) { 
      // this.usersCollection = afstore.collection<User>('users');
      this.reports = this.afstore.collection('reportList').snapshotChanges().pipe(
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
