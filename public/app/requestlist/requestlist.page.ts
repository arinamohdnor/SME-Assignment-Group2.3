import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.page.html',
  styleUrls: ['./requestlist.page.scss'],
})
export class RequestlistPage implements OnInit {
  id: any;
  name: string;
  sub
  rideoffers: Observable<any>;
  constructor(
    private route: ActivatedRoute,
    private firebase  : FirebaseApp,
    private afStore: AngularFirestore,
    public router: Router,
    public alertController : AlertController,
  ) { 
      this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];

        this.rideoffers = this.afStore.collection('rideoffers/' + this.id + '/requestList').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    });
  }

  ngOnInit() {
  }

  getuid(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        resolve(user.uid);
      });
    })
  }


  approve(value, value2){
    this.afStore.collection('rideoffers').doc(this.id).collection('requestList').doc("" + value).update({
      isApproved: true
    }).then(()=>{

    this.afStore.collection('users').doc(value2).collection('myRequest').doc("" + this.id).update({
      isApproved: true
    })
  }).then(()=>{
    this.presentAlert("Approved!","Passenger approved.")
    this.router.navigate(['/mytrip'])
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

}
