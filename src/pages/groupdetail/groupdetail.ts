import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditgroupPage } from '../editgroup/editgroup';
import { ClassdetailPage } from '../classdetail/classdetail';
/**
 * Generated class for the GroupdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupdetail',
  templateUrl: 'groupdetail.html',
})
export class GroupdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupdetailPage');
  }
  editgroup() {
    this.navCtrl.push(EditgroupPage);
  }
  classdetails() {
    this.navCtrl.push(ClassdetailPage);
  }
}
