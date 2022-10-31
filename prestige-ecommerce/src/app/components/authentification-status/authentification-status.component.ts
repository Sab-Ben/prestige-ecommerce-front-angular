import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/services/data-sharing.service';


@Component({
  selector: 'app-authentification-status',
  templateUrl: './authentification-status.component.html',
  styleUrls: ['./authentification-status.component.css']
})
export class AuthentificationStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  storage: Storage = sessionStorage;
  isUserLogin: boolean = false;

  constructor(private router : Router,
              private dataSharingService : DataSharingService) 
              {this.dataSharingService.isUserLogin.subscribe( value => {
                this.isUserLogin = value;
            });}

  ngOnInit(): void {

    this.handleAuthentification();
  }

  handleAuthentification() {
    const userItem = this.storage.getItem('utilisateur');
    if(userItem){
      const user = JSON.parse(userItem);
      this.isAuthenticated = true;
      this.dataSharingService.isUserLogin.next(true);
    }
  }

  logout(){
    sessionStorage.removeItem('utilisateur'); 
    this.router.navigate(['/accueil']);
  }
}
