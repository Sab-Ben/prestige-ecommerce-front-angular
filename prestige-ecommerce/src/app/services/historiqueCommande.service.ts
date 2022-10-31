import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueCommande } from '../common/historique-commande';
import { Utilisateur } from '../common/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueCommandeService {
  
  private commandesUrl = environment.apiUrl + '/commandes';

  constructor(private httpClient : HttpClient) { }

  recupHistoriqueCommande(utilisateur : Utilisateur) : Observable<GetResponseHistoriqueCommande> {
    const historiqueCommandeUrl = `${this.commandesUrl}/search/findByUtilisateurEmailOrderByDateDesc?email=${utilisateur.email}`;
    return this.httpClient.get<GetResponseHistoriqueCommande>(historiqueCommandeUrl);
  }
}

interface GetResponseHistoriqueCommande{
  _embedded: {
    commandes: HistoriqueCommande[];
  }
}
