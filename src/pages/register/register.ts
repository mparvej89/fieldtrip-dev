import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceProvider } from '../../providers/global-service/global-service';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  FormRegistration: FormGroup;

  constructor(public remotService: GlobalServiceProvider, public formbuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.FormRegistration = formbuilder.group({
      fname: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(50), Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      password: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      termsCheck: [null, Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}')])]
    })
  }
  onTermsChecked($event) {
    if (!$event.checked) {
      this.FormRegistration.patchValue({ termsCheck: null });

    }
  }

  sendRegistrationForm(stepTwovalue) {


    if (this.FormRegistration.valid) {

      var stepOneform = this.FormRegistration.value;
      var regData = {
        email: stepOneform.email,
        password: stepOneform.password,
        firstname: stepOneform.fname,
        lastname: stepOneform.lname,
        phone: stepOneform.phone,
        gender: stepOneform.gender

      };
      this.remotService.presentLoading();
      this.remotService.postData(regData, 'registration').subscribe((response) => {
        this.remotService.dismissLoader();
        if (response.status == 1) {
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.remotService.presentToast(response.message);
        }
      }, () => {
        this.remotService.dismissLoader();
        this.remotService.presentToast('Error saving data.');
      })

    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  backLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

}
