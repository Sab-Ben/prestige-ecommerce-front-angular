import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentification } from '../common/authentification';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private authentificationUrl = environment.apiUrl + '/api/connexion/success';

  constructor(private httpClient: HttpClient) { }

  connexionSuccessMessage(authentification : Authentification): Observable<any> {
    return this.httpClient.post<Authentification>(this.authentificationUrl, authentification);
  }
}
