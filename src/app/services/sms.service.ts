import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/**
 * Service d'envoi de SMS.
 * Utilise l'API Orange SMS Senegal
 */
@Injectable()
export class SmsService {

  constructor(public http:Http) {
    console.log("SMS Service connected");
   }

  /**
  * Récupère un Access Token
  * Cette fonction requiert une connexion sécurisée (HTTPS)
  * @param client_id Id de connection client
  * @param client_secret Mot de passe de connection client
  */
  getAToken(client_id:string, client_secret:string){
    let url = "https://api.orange.com/oauth/v2/token";
    let _client_id = client_id;
    let _client_secr = client_secret;
    let authorization_header = "Basic " + btoa(client_id + ":" + client_secret)
    let requestHeaders = new Headers({"Authorization" : authorization_header});
    requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: requestHeaders });
    let _accessToken:any;
    
    const data = JSON.stringify({ 'grant_type':"client_credentials"});

    this.http.post(url, data, options)
    .map(response => response.json())
    .subscribe(accessToken =>{ _accessToken = accessToken; });

    return _accessToken;
  }

  /**
   * Retourne le contrat SMS avec le crédit SMS restant.
   * @param accessToken Token d'accès valide pour l'exécution de la requête
   */
  getContrat(accessToken:string):Observable<any>{
    let url = "https://api.orange.com//sms/admin/v1/contracts";
    let authorization_header = "Bearer " + accessToken;
    let requestHeaders = new Headers({"Authorization" : authorization_header});
    requestHeaders.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: requestHeaders });    

    return this.http.get(url, options)
    .map(response => response.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Envoie un SMS
   * @param accessToken Token d'accès valide pour l'exécution de la requête
   * @param senderName Nom de l'émetteur du SMS
   * @param receiverNumber Numéro du destinataire
   * @param message Contenu du SMS
   */
  sendSMS(accessToken:string, senderName:string, receiverNumber:string, message:string):Observable<any>{
    let senderAddress = encodeURI("tel:+22100000000");
    let url = "https://api.orange.com/smsmessaging/v1/outbound/"+senderAddress+"/requests";
    let authorization_header = "Bearer " + accessToken;
    let requestHeaders = new Headers({"Authorization" : authorization_header});
    requestHeaders.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: requestHeaders });
    const pre_formatted_data =  {"outboundSMSMessageRequest":
                    {
                      "address": "tel:"+receiverNumber,
                      "senderAddress":"tel:+22100000000",
                      "senderName": encodeURI(senderName),
                      "outboundSMSTextMessage":{
                        "message": message
                      }
                    }
                  }
    const data = JSON.stringify(pre_formatted_data);
    console.log(data);
  
    return this.http.post(url, data, options)
      .map(response => response.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}