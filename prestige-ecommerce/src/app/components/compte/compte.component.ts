import { Component, OnInit } from '@angular/core';
import { HistoriqueCommande } from 'src/app/common/historique-commande';
import { InfoAdresses } from 'src/app/common/info-adresses';
import { InfoUtilisateur } from 'src/app/common/info-utilisateur';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {
  listeHistoriqueCommande: HistoriqueCommande[] = [];
  listeAdresses : InfoAdresses [] = [];
  utilisateur : InfoUtilisateur | undefined;
  storage: Storage = sessionStorage; 

  constructor() { }

  ngOnInit(): void {
    this.handleHistoriqueCommande();
    this.handleInformationUtilisateur();
    this.handleAdressesInformation();
  }
  
  handleHistoriqueCommande() {
    const userCommande = JSON.parse(this.storage.getItem('commandes') || '[]') ;
    for(let commande of userCommande){
      this.listeHistoriqueCommande.push({
        numeroSuiviCommande: commande.numeroSuiviCommande,
        totalPrix: commande.totalPrix,
        totalQuantite: commande.totalQuantite,
        date: commande.date
      })
    }
  }

  handleInformationUtilisateur() {
    const userInfo = JSON.parse(this.storage.getItem('utilisateur')!)
    this.utilisateur = {
      nom: userInfo.nom, 
      prenom: userInfo.prenom, 
      email:userInfo.email, 
      telephone:userInfo.telephone
    };
  }

  handleAdressesInformation() {
    const userAdresse = JSON.parse(this.storage.getItem('adresses')|| '[]');
    for(let adresse of userAdresse){
      this.listeAdresses.push({
        nomAdresse: adresse.nomAdresse,
        adresse: adresse.adresse,
        codePostale: adresse.codePostale,
        ville: adresse.ville
      })
    }
  }
}