import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { LoyaltyWarrantyListPage } from '../loyalty-warranty-list/loyalty-warranty-list';

/**
 * Generated class for the WarrantyAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-warranty-add',
  templateUrl: 'warranty-add.html',
})
export class WarrantyAddPage {

  data:any ={}
  today_date: any;
  savingFlag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db: MyserviceProvider, public myservice: MyserviceProvider, public service: MyserviceProvider,public constant: ConstantProvider,
   ) {
    this.today_date = new Date().toISOString().slice(0, 10);

  }

  submit(){
    

    this.data.dealer_id = this.constant.UserLoggedInData.id;
    this.savingFlag = true;
    this.service.addData({'data':this.data} , 'AppBatteryWarrantyRegistration/add_warranty').then((result) => {

      if (result['statusCode'] == 200) {
            this.myservice.successToast(result['statusMsg']);
            this.savingFlag = false;
            this.constant.setData();
            this.navCtrl.setRoot(LoyaltyWarrantyListPage);
          
      
     }
      else {
      this.myservice.errorToast(result['statusMsg'])
      this.savingFlag = false;
    }
    });


  }
  caps_add(add:any)
  {
      this.data.address = add.replace(/\b\w/g, l => l.toUpperCase());
  }
  

  MobileNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarrantyAddPage');
  }

}
