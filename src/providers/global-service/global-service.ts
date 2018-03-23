import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';
//import { mycommonresponse, chathistory, commonStatus, common, common33, login } from '../models/api-model';
import { mycommonresponsedata, mycommonresponse } from '../../models/api-model';
import { AlertController } from 'ionic-angular';

@Injectable()

export class GlobalServiceProvider {
  labelAttribute = "name";
  custom_loader: any;
  custom_toast: any;
  API_URL: any;
  laraapi_url: any;
  Response: any;
  loader: any;
  pages: any;
  storageObj: any;
  site_url: any;

  constructor(public http: Http, public loadingcntrl: LoadingController,
    private toastcntrl: ToastController, private alertCtrl: AlertController) {

    this.API_URL = 'http://fieldatrips.pwsportfolio.com/api/';
    /* this.site_url = 'http://mojolynclife.info/';
    this.storageObj = storage; */

  }



  postData(data, urlname): Observable<mycommonresponsedata> {
    const url: string = `${this.API_URL}` + urlname;
    return this.http.post(url, data)
      .map(res => <mycommonresponsedata>res.json());
  }

  presentLoading() {
    this.loader = this.loadingcntrl.create({
    });
    this.loader.present();
  }

  dismissLoader() {

    if (this.loader)
      this.loader.dismiss();

    this.loader = false;
  }

  presentToast(msg) {
    let toast = this.toastcntrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }


}