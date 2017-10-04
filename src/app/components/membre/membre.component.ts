import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent implements OnInit {
  Users:iUser[];

  /** Représente le mode d'affichage des données; En pagination par défaut */
  modePagination:boolean = true;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe((users) =>{
      this.Users = users;
    });
  }
}

/**
 * Interface pour la représentation des utilisateurs
 */
interface iUser{
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
