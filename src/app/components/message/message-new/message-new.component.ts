import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { SmsService } from '../../../services/sms.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {
  creditSMS:number;
  disclaimer:boolean = false;
  membres:IMembre[];
  message:{
    sender:string,
    sendlist:string,
    subject:string,
    content:string
  }

  constructor(private SMS:SmsService, private Data:DataService) { }

  ngOnInit() {
    this.disclaimer = (this.creditSMS == 0) ? true : false;
    this.message = {sender:"", sendlist:"", subject:"", content:""};
    /** On récupère le nombre d'unités SMS disponibles */
    this.SMS.getContrat("").subscribe(reponse => {
      this.creditSMS = reponse.partnerContracts.contracts[0].serviceContracts[0].availableUnits;
    });
    this.Data.getUsers().subscribe(members => { this.membres = members });
  }

  /**
   * Ajoute ou supprime un numéro de la liste d'envoi
   * @param phone Numéro de téléphone
   */
  toggleSendList(phone:string){
    this.message.sendlist =  ( this.message.sendlist.search(phone+";") == -1 ) ? this.message.sendlist += phone+";" : this.message.sendlist.replace(phone+";", "") ;
  }
  
  /**
   * Envoie les SMS aux destinataires
   */
  sendMessage(){
    let sendlistArray = this.message.sendlist.split(";");

    /** Envoi du SMS à la liste de destinataires */
    sendlistArray.forEach(receiver => {
      this.SMS.sendSMS("", this.message.sender, receiver, this.message.content)
      .subscribe(reponse => { console.log(reponse); });
    });
  }
}


/**
 * Interface pour la représentation des utilisateurs
 */
interface IMembre{
  id:number,
  name: string,
  username:string,
  email:string,
  address:{
    street:string,
    suite:string,
    city:string,
    zipcode:string,
    geo:{
      lat:number,
      lng:number
    },
  },
  phone:string,
  website:string,
  company:{
    name:string,
    catchPhrase:string,
    bs:string
  },
}
