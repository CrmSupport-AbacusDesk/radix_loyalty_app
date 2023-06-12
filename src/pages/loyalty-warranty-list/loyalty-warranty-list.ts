import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ModalController, LoadingController, PopoverController, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import moment from 'moment';
import { WarrantyAddPage } from '../warranty-add/warranty-add';


/**
 * Generated class for the LoyaltyWarrantyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loyalty-warranty-list',
  templateUrl: 'loyalty-warranty-list.html',
})
export class LoyaltyWarrantyListPage {
  date:any
  count:any
  today_checkin:any=[];
  user_data:any={};
  start:any=0;
  limit:any=10;
  flag:any='';
  filter:any={};
  load_data:any
  distributor_lead_count:any
  dealer_lead_count:any
  userId:any
  dealer_id:any
  warrenty_list:any=[];
  
  constructor( private app:App,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public db:MyserviceProvider,public constant:ConstantProvider,public loadingCtrl: LoadingController)
  {
    this.date = moment(this.date).format('YYYY-MM-DD');
    this.userId = this.navParams.get('userId');
    this.warranty_list();

}
  ionViewWillEnter()
  {


  }

  warranty_list()
  {
      this.filter.dealer_id = this.constant.UserLoggedInData.id;
    //   this.db.show_loading();
      console.log(this.filter);
      
      
      this.db.addData({'filter':this.filter},"AppBatteryWarrantyRegistration/battery_warranty_list")
      .then(resp=>{
          console.log(resp);
        //   this.db.dismiss()
          this.warrenty_list = resp['result'];
          
      },
         err=>
      {
          this.db.dismiss();
          this.db.errToasr()
      })
  }
 
  loadData(infiniteScroll)
  {
      console.log('loading');
      this.start = this.warrenty_list.length;
      this.db.addData({user_data:this.user_data,"start":this.start,"limit":this.limit,"search":this.filter},"AppBatteryWarrantyRegistration/battery_warranty_list")
      .then((r) =>{
          console.log(r);
          if(r['result']=='')
          {
              this.flag=1;
          }
          else
          {
              setTimeout(()=>{
                  this.warrenty_list=this.warrenty_list.concat(r['result']);
                  console.log('Asyn operation has stop')
                  infiniteScroll.complete();
              },1000);
          }
      });
  }
  

  addRegistration()
  {
   this.navCtrl.push(WarrantyAddPage)
  }
  doRefresh (refresher)
  {   
    this.filter.master=null
    this.filter={}
    this.limit=0
    this.start=0
    
      this.warranty_list() 
      setTimeout(() => {
          refresher.complete();
      }, 1000);
  }
}
