import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentification } from '../common/authentification';
import { Utilisateur } from '../common/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private authentificationUrl = environment.apiUrl + '/api/connexion/success';

  constructor(private httpClient: HttpClient) { }

  connexionSuccessMessage(authentification : Authentification): Observable<any> {
    return this.httpClient.post<Authentification>(this.authentificationUrl, authentification);
  }

  public seConnecter(utilisateur : Utilisateur) {
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  public estConnecte(){
    return localStorage.getItem('ACCESS_TOKEN') !==null;
  }

  public seDeconnecter(){
    localStorage.removeItem('ACCESS_TOKEN');
  }
}