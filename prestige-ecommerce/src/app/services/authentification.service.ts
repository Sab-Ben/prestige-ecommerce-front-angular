import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Authentification } from '../common/authentification';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService{
 
  storage: Storage = sessionStorage;
  private authentificationUrl = environment.apiUrl + '/connexion/success';

  constructor(private httpClient: HttpClient) { }

  connexionSuccessMessage(authentification : Authentification): Observable<any> {
    return this.httpClient.post<Authentification>(this.authentificationUrl, authentification);
  }

  getUtilisateur(): any {
    return this.storage.getItem('utilisateur');
  }
}
