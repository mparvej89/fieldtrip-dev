import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
import { NativeStorage } from '@ionic-native/native-storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FormLogin: FormGroup;
  constructor(public remotService: GlobalServiceProvider, public nativeStorage: NativeStorage, public formbuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
    this.FormLogin = formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}')])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  sendLoginForm() {
    if (this.FormLogin.valid) {

      var stepOneform = this.FormLogin.value;
      var regData = {
        email: stepOneform.email,
        password: stepOneform.password
      };
      this.remotService.presentLoading();
      this.remotService.postData(regData, 'loginApi').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.status == 1) {
          this.nativeStorage.setItem('loginvalue', {
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            email: response.data.email,
            picture: response.data.picture
          }).then(() => {
            // console.log('Login Item Stored');
            this.navCtrl.setRoot(HomePage);
          }, (err) => {
            // console.log('Login Item Stored Error' + err);
          });
        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error saving data.');
      })

    }

  }

  facebookLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {

        console.log(res);
        if (res.status == "connected") {

          this.getFbUserDetail(res.authResponse.userID);
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getFbUserDetail(userid) {
    this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
      .then(res => {
        console.log('fbdata', res);

        var names = res.name.split(" ");
        var facemail = res.hasOwnProperty("email") ? res.email : null;
        var fbParams = {
          facebook_id: res.id,
          firstname: names[0],
          lastname: names[1],
          email: facemail,
          gender: res.gender
        };
        console.log(fbParams);
        this.remotService.presentLoading();
        this.remotService.postData(fbParams, 'facebookApi').subscribe((response) => {
          this.remotService.dismissLoader();
          if (response.status == 1) {
            this.nativeStorage.setItem('loginvalue', {
              id: response.data.id,
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              email: response.data.email,
              picture: response.data.picture
            }).then(() => {
              // console.log('Login Item Stored');
              this.navCtrl.setRoot(HomePage);
            }, (err) => {
              // console.log('Login Item Stored Error' + err);
            });
          } else {
            this.remotService.presentToast(response.message);
          }
        }, () => {
          this.remotService.dismissLoader();
          this.remotService.presentToast('Error!');
        });
        //this.users = res;
      })
      .catch(e => {
        this.remotService.presentToast(e);
        console.log(e);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  gotohome() {
    this.navCtrl.setRoot(HomePage);
  }

  registration() {
    this.navCtrl.setRoot(RegisterPage);
  }

}
