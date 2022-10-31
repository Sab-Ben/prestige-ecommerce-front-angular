import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUtilisateur } from '../common/info-utilisateur';

@Injectable({
  providedIn: 'root'
})
export class InfoUtilisateurService {
  private utilisateurUrl = environment.apiUrl + '/utilisateurs';

  
  constructor(private httpClient : HttpClient) { }

    recupInfoUtilisateur(email : string) : Observable<GetResponseInformations> {
    const infoUtilisateurUrl = `${this.utilisateurUrl}/search/findById?id=${email}`;
    return this.httpClient.get<GetResponseInformations>(infoUtilisateurUrl);
  }
}

interface GetResponseInformations {
  _embedded: {
    generales: InfoUtilisateur[];
  }
}
