import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CreategroupPage } from '../pages/creategroup/creategroup';
import { EditgroupPage } from '../pages/editgroup/editgroup';
import { GroupdetailPage } from '../pages/groupdetail/groupdetail';
import { ClassdetailPage } from '../pages/classdetail/classdetail';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import { EditprofilePage } from '../pages/editprofile/editprofile';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    CreategroupPage,
    EditgroupPage,
    GroupdetailPage,
    ClassdetailPage,
    EditprofilePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp, {
      pageTransition: 'ios-transition',
      swipeBackEnabled: true,
      tabsHideOnSubPages: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage, RegisterPage,
    CreategroupPage,
    EditgroupPage,
    GroupdetailPage,
    ClassdetailPage,
    EditprofilePage
  ],
  providers: [
    StatusBar,
    SplashScreen, Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalServiceProvider, NativeStorage
  ]
})
export class AppModule { }
