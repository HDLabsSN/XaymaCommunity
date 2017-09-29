import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SmsService {

  constructor(public http:Http) {
    console.log("SMS Service connected");
   }

   /**
    * Récupère un Access Token pour le Gateway SMS - Orange Senegal
    * @param client_id Id de connection client
    * @param client_secret Mot de passe de connection client
    */
   getAToken(client_id:string, client_secret:string):void{
     let url = "https://api.orange.com/oauth/v2/token";
     let _client_id = client_id;
     let _client_secr = client_secret;
     let authorization_header = "Basic " + btoa(client_id + ":" + client_secret)
     let requestHeaders = new Headers({"Authorization" : authorization_header});
     requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
     let options = new RequestOptions({ headers: requestHeaders });

     const data = JSON.stringify({ 'grant_type':"client_credentials"});

     let retour = this.http.post(url, data, options)
      .map(response => response.json());

      console.log(retour.subscribe());

      //return retour;
   }

}
