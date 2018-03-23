import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreategroupPage } from '../creategroup/creategroup';
import { EditgroupPage } from '../editgroup/editgroup';
import { GroupdetailPage } from '../groupdetail/groupdetail';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  MainCat: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.MainCat = '1st';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  opencreate() {
    this.navCtrl.push(CreategroupPage);
  }
  groupdetail() {
    this.navCtrl.push(GroupdetailPage);
  }
}
