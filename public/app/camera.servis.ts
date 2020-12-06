import { Injectable } from '@angular/core';
import { Camera,  CameraOptions } from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera : Camera,
  ) { }

  libraryOptions : CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetHeight: 480,
    targetWidth: 480
  }

  cameraOptions : CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL is memory intensize
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.CAMERA,
    targetHeight: 480,
    targetWidth: 480
  }

}
