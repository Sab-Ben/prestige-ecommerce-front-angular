import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inscription } from '../common/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private inscriptionUrl = environment.apiUrl + '/inscription/save';

  constructor(private httpClient: HttpClient) { }

  confirmationInscription(inscription : Inscription): Observable<any> {
    return this.httpClient.post<Inscription>(this.inscriptionUrl, inscription);
  }
}
