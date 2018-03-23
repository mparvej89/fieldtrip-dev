import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CreategroupPage } from '../pages/creategroup/creategroup';
import { NativeStorage } from '@ionic-native/native-storage';
import { EditprofilePage } from '../pages/editprofile/editprofile';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loggedUserName: any;
  loggedPicture: string;

  pages: Array<{ icon: any, title: string, component: any }>;
  mPages: Array<{ icon: any, title: string, component: any }>;
  constructor(public platform: Platform, public nativeStorage: NativeStorage, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      { icon: 'home', title: 'Roster', component: LoginPage },
      { icon: 'home', title: 'Students', component: HomePage },
      { icon: 'home', title: 'Forms & Responses', component: LoginPage },
      { icon: 'home', title: 'Event', component: HomePage },
      { icon: 'home', title: 'Schedule', component: LoginPage },


    ];
    this.mPages = [
      { icon: 'home', title: 'Payments', component: LoginPage },
      { icon: 'home', title: 'Messages', component: HomePage },
      { icon: 'home', title: 'Album', component: LoginPage },
      { icon: 'home', title: 'Logout', component: LoginPage }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.nativeStorage.getItem('loginvalue').then((data) => {
        // console.log(data);
        this.rootPage = HomePage;
        this.loggedUserName = data.firstname + " " + data.lastname;
        this.loggedPicture = data.picture;
      },
        (error) => {
          // console.error(error);
          this.rootPage = LoginPage;
        });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Logout') {
      this.nativeStorage.clear();
    }
    //console.log(page);
    this.nav.setRoot(page.component);
  }

  openPageprofile() {
    this.nav.push(EditprofilePage);
  }

}
