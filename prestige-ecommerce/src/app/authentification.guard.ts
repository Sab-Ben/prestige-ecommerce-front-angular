import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private AuthentificationService : AuthentificationService,
              private router : Router) {}
              
  canActivate(): boolean {
    
      if (!this.AuthentificationService.getUtilisateur) {
        this.router.navigate(['accueil']);
        return false;
      } else {
        return true;
      }
    }
  }
