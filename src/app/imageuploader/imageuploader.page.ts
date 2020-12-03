import { Component, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';
import { CameraService } from 'src/app/camera.servis';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Time } from '@angular/common';
import { FirebaseApp } from '@angular/fire';
import * as moment from 'moment';
import { Camera } from "@ionic-native/camera/ngx";
import { DatabaseService } from 'src/app/database.service';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.page.html',
  styleUrls: ['./imageuploader.page.scss'],
})
export class ImageuploaderPage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  imageData = null;
  license: string
  id
  users: Observable<User[]>;

  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
    public router: Router,
    public navCtrl: NavController,
    public alert: AlertController,
    public firebase: FirebaseApp,
    private actionSheetController : ActionSheetController,
    private cameraService         : CameraService,
    private dbService             : DatabaseService,
    private camera                : Camera,
    // private storage               : Storage,
  ) {
    this.mainuser = afstore.doc(`users/${user.getUID()}`)
			this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.id = event.id
		})
   }

  ngOnInit() {
  }

  update(output){
      this.afstore.doc("users/"+this.user.getUID()).update({
        license: output,
        })
    }

    async addImage() {
      const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [
          {
            text: 'Camera',
            handler: () => {
              this.camera.getPicture(this.cameraService.cameraOptions)
              .then( imageData => {
                this.imageData = "data:image/png;base64," + imageData;
                // this.resizeImage();
              });
            }
          },{
            text: 'Gallery',
            handler: () => {
              this.camera.getPicture(this.cameraService.libraryOptions)
              .then( imageData => {
                this.imageData = "data:image/png;base64," + imageData;
              });
            }
          },{
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await actionSheet.present();
    }

    async save(){
      
      try{
      var userRef= this.id
      // upload image first
      this.dbService.uploadImageToFireStorage(this.imageData, this.id).then((output:string) => {
        // get url
        this.update(output)
        this.showAlert("Done!","Image uploaded wait for approval from admin")
        this.router.navigate(['/tabs/profile'])
      })}
      catch(err) {
        this.showAlert("Ops!","Please upload a photo of your item!");
      
    }
  }

  async showAlert(header: string, message: string) {
		const alert = await this.alert.create({
			header,
			message,
			buttons: ['OK']
		})

		await alert.present()
  }

  
}