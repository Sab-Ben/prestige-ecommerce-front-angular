import { Component, OnInit } from '@angular/core';
import { HistoriqueCommande } from 'src/app/common/historique-commande';
import { InfoAdresses } from 'src/app/common/info-adresses';
import { InfoUtilisateur } from 'src/app/common/info-utilisateur';
import { HistoriqueCommandeService } from 'src/app/services/historiqueCommande.service';
import { InfoAdressesService } from 'src/app/services/info-adresses.service';
import { InfoUtilisateurService } from 'src/app/services/info-utilisateur.service';


@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  listeHistoriqueCommande: HistoriqueCommande[] = [];
  listeAdresses : InfoAdresses [] = [];
  listeUtilisateur : InfoUtilisateur [] = [];
  storage: Storage = sessionStorage; 

  constructor(private historiqueCommandeService : HistoriqueCommandeService,
              private infoUtilisateurService : InfoUtilisateurService,
              private infoAdresseService : InfoAdressesService) { }

  ngOnInit(): void {
    this.handleHistoriqueCommande();
    this.handleInformationUtilisateur();
    this.handleAdressesInformation();
    
  }
  
  handleHistoriqueCommande() {
    const emailUser = JSON.parse(this.storage.getItem('utilisateurEmail')!);

    this.historiqueCommandeService.recupHistoriqueCommande(emailUser).subscribe(
      data => {
        this.listeHistoriqueCommande = data._embedded.commandes;
      }
    )
  }

  handleInformationUtilisateur() {
    const emailUser = JSON.parse(this.storage.getItem('utilisateurEmail')!);

    this.infoUtilisateurService.recupInfoUtilisateur(emailUser).subscribe(
      data => {
        this.listeUtilisateur = data._embedded.generales;
      }
    )
  }

  handleAdressesInformation() {
    const emailUser = JSON.parse(this.storage.getItem('utilisateurEmail')!);

    this.infoAdresseService.recupInfoAdresse(emailUser).subscribe(
      data => {
        this.listeAdresses = data._embedded.adresses;
      }
    )
  }

  
}