import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) { 
    console.log("Data service connected")
  }

  /**
   * Récupère tous les utilisateurs
   */
  getUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users")
      .map(result => result.json());
  }

}
