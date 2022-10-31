import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
