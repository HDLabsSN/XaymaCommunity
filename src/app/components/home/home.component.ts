import { Component, OnInit } from '@angular/core';
import { SmsService } from "../../services/sms.service";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private SMS:SmsService, private Data:DataService){
      }

  ngOnInit() {
    let clientId = "waEz9srw97eJNzRMSYzHB2IGGjmNkAqb";
    let clientSc = "y4aLSeMuqtC36CPe";

    this.SMS.getAToken(clientId, clientSc);
    /*.subscribe((accessToken) => {
      console.log("Le token récupéré est :");
      console.log(accessToken);
    })*/
  }

}
