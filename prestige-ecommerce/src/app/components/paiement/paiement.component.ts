import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Achat } from 'src/app/common/achat';
import { Commande } from 'src/app/common/commande';
import { CommandeItem } from 'src/app/common/commandeitem';
import { Utilisateur } from 'src/app/common/utilisateur';
import { PaiementService } from 'src/app/services/paiement.service';
import { PanierService } from 'src/app/services/panier.service';
import { PrestigeFormService } from 'src/app/services/prestige-form.service';
import { PrestigeValidators } from 'src/app/validators/prestige-validators';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  utilisateur! : Utilisateur;

  paiementFormGroup!: FormGroup;

totalPrix: number = 0;
totalQuantite: number = 0;

carteCreditAnnee: number[]=[];
carteCreditMois: number[]=[];
storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private prestigeFormService: PrestigeFormService,
              private panierService: PanierService,
              private paiementService : PaiementService,
              private router : Router) 
              {  }  

  ngOnInit(): void {

    this.gardeDetailsPanier();
    
    this.paiementFormGroup = this.formBuilder.group({
      adresseLivraison: this.formBuilder.group({
        nomAdresse: new FormControl('', [Validators.required, Validators.minLength(5), PrestigeValidators.notOnlyWhitespace]),
        adresse: new FormControl('', [Validators.required, Validators.minLength(15), PrestigeValidators.notOnlyWhitespace]),
        codePostale: new FormControl('', [Validators.required, Validators.minLength(5), PrestigeValidators.notOnlyWhitespace]),
        ville: new FormControl('', [Validators.required, Validators.minLength(5), PrestigeValidators.notOnlyWhitespace])
      }),
      carteCredit: this.formBuilder.group({
        carteType: new FormControl('', [Validators.required]),
        nomSurLaCarte: new FormControl('', [Validators.required, Validators.minLength(5), PrestigeValidators.notOnlyWhitespace]),
        chiffresSurLaCarte: new FormControl('', [Validators.required, Validators.pattern("^((\\4152-?)|0)?[0-9]{16}$")]),
        securiteCode: new FormControl('', [Validators.required, Validators.pattern("^((\\553-?)|0)?[0-9]{3}$")]),
        expirationMois: [''],
        expirationAnnee: ['']
      })
    });

    const debutMois: number = new Date().getMonth() + 1;
    this.prestigeFormService.getCarteCreditMois(debutMois).subscribe(
      data => {
        this.carteCreditMois = data;
      }
    )

    this.prestigeFormService.getCarteCreditAnnee().subscribe(
      data => {
        this.carteCreditAnnee= data;
      }
    )
    
    const userItem = this.storage.getItem('utilisateur');
    if(userItem){
      this.utilisateur = JSON.parse(userItem);
    } else {
      this.utilisateur=history.state;
    }
  }

  gardeDetailsPanier() {
    this.panierService.totalQuantite.subscribe(
      totalQuantite => this.totalQuantite = totalQuantite
    );

    this.panierService.totalPrix.subscribe(
      totalPrix => this.totalPrix = totalPrix
    );
  }
  

  get nomAdresse(){ return this.paiementFormGroup.get('adresseLivraison.nomAdresse');}
  get adresse(){ return this.paiementFormGroup.get('adresseLivraison.adresse');}
  get codePostale(){ return this.paiementFormGroup.get('adresseLivraison.codePostale');}
  get ville(){ return this.paiementFormGroup.get('adresseLivraison.ville');}

  get carteType(){ return this.paiementFormGroup.get('carteCredit.carteType')}
  get nomSurLaCarte(){ return this.paiementFormGroup.get('carteCredit.nomSurLaCarte')}
  get chiffresSurLaCarte(){ return this.paiementFormGroup.get('carteCredit.chiffresSurLaCarte')}
  get securiteCode(){ return this.paiementFormGroup.get('carteCredit.securiteCode')}


  onSubmit() {
    if (this.paiementFormGroup.invalid) {
      this.paiementFormGroup.markAllAsTouched();
      return;
    }

    let commande = new Commande();
    commande.totalPrix = this.totalPrix;
    commande.totalQuantite = this.totalQuantite;
    
    const panierItems = this.panierService.panierItems;

    let commandeItems: CommandeItem[] = panierItems.map(tempPanierItem => new CommandeItem(tempPanierItem));

    let achat = new Achat();
    achat.utilisateur = this.utilisateur;
    achat.adresse = this.paiementFormGroup.controls['adresseLivraison'].value;
    achat.commande = commande;
    achat.commandeItems = commandeItems;

   this.paiementService.passerCommande(achat).subscribe({

    next:response => {
      alert(`Votre commande a bien été validée. Numéro suivi de commande ${response.numeroSuiviCommande}`); 

      this.resetPanier();
   },

   error:erreur => {
    alert(`Il y a une erreur: ${erreur.message}`);
      },
    }
   );
  }
  resetPanier() {
    this.panierService.panierItems = [];
    this.panierService.totalPrix.next(0);
    this.panierService.totalQuantite.next(0);
    this.paiementFormGroup.reset();
    this.router.navigateByUrl("/accueil");
  }

  handleMoisEtAnnees(){
    const carteCreditFormGroup = this.paiementFormGroup.get('carteCredit');
    const anneeEnCours: number = new Date().getFullYear();
    const anneeSelectionnee: number = Number(carteCreditFormGroup?.value.expirationAnnee);

    let debutMois: number;

    if(anneeEnCours === anneeSelectionnee) {
      debutMois = new Date().getMonth() +1;
    } else {
      debutMois = 1;
    }

    this.prestigeFormService.getCarteCreditMois(debutMois).subscribe(
      data =>{
        this.carteCreditMois = data;
      }
    )
  }
}
