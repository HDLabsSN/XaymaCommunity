import { Component, OnInit } from '@angular/core';
import { SmsService } from "../../services/sms.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contratSMS:any;
  creditSMS:number;

  constructor(private SMS:SmsService, private Data:DataService){
      }

  ngOnInit() {
    this.contratSMS = this.SMS.getContrat("a23tlrQdpSwuO4HbN5DamNNYl6bN")
        .subscribe(reponse =>{ 
          this.contratSMS = reponse.partnerContracts.contracts[0].serviceContracts[0];
          this.creditSMS = this.contratSMS.availableUnits;
          console.log(this.creditSMS);
    });
  }
}
