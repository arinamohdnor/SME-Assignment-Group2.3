import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private afStorage: AngularFireStorage
  ) { }

  deleteImageFromFireStorage(id: string){
    this.afStorage.ref(id);
  }

  uploadImageToFireStorage(imageData: string, id:string){
    return new Promise((resolve,reject) => {
      var metadata = {
        contentType: 'image/jpeg'
      }
      this.afStorage.ref(id)
      .putString(imageData, 'data_url', metadata)
      .then(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(url => {
          console.log(url);
          resolve(url);
        })
        .catch(e => {
          reject(e);
        })
      })
    })
  }
}
