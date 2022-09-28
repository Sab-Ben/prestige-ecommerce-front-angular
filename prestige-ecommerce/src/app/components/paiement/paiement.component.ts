import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Achat } from 'src/app/common/achat';
import { Commande } from 'src/app/common/commande';
import { CommandeItem } from 'src/app/common/commandeitem';
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

  paiementFormGroup!: FormGroup;

totalPrix: number = 0;
totalQuantite: number = 0;

carteCreditAnnee: number[]=[];
carteCreditMois: number[]=[];

  constructor(private formBuilder: FormBuilder,
              private prestigeFormService: PrestigeFormService,
              private panierService: PanierService,
              private paiementService : PaiementService,
              private router : Router) { }

  ngOnInit(): void {

    this.gardeDetailsPanier();
    
    this.paiementFormGroup = this.formBuilder.group({
      client: this.formBuilder.group({
        prenom: new FormControl('', [Validators.required, Validators.minLength(2), PrestigeValidators.notOnlyWhitespace]),
        nom: new FormControl('', [Validators.required, Validators.minLength(2), PrestigeValidators.notOnlyWhitespace]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), PrestigeValidators.notOnlyWhitespace]),
        telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+33-?)|0)?[0-9]{10}$"), PrestigeValidators.notOnlyWhitespace])
      }),
      adresseLivraison: this.formBuilder.group({
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
  }
  gardeDetailsPanier() {
    this.panierService.totalQuantite.subscribe(
      totalQuantite => this.totalQuantite = totalQuantite
    );

    this.panierService.totalPrix.subscribe(
      totalPrix => this.totalPrix = totalPrix
    );
  }
  
  get prenom() { return this.paiementFormGroup.get('client.prenom');}
  get nom() { return this.paiementFormGroup.get('client.nom');}
  get email() { return this.paiementFormGroup.get('client.email');}
  get telephone(){ return this.paiementFormGroup.get('client.telephone');}

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

    let commande = new Commande(this.totalPrix, this.totalQuantite );
    

    const panierItems = this.panierService.panierItems;

    /*let commandeItem : CommandeItem[] = [];
    for(let i=0; i < panierItems.length; i++) {
      commandeItem[i] = new CommandeItem(panierItems[i]);
    }*/

    let commandeItems: CommandeItem[] = panierItems.map(tempPanierItem => new CommandeItem(tempPanierItem));

    let achat = new Achat();
    achat.utilisateur =  this.paiementFormGroup.controls['client'].value
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

    this.router.navigateByUrl("/produits");
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