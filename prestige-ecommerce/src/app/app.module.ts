import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr-FR');
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListeProduitComponent } from './components/liste-produit/liste-produit.component';
import { HttpClientModule } from '@angular/common/http';
import { ProduitService } from './services/produit.service';
import {Routes, RouterModule} from '@angular/router';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MarqueComponent } from './components/marque/marque.component';
import { PanierStatutsComponent } from './components/panier-statuts/panier-statuts.component';
import { PanierDetailsComponent } from './components/panier-details/panier-details.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ConnexionComponent } from './components/authentification/authentification.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompteComponent } from './components/compte/compte.component';
import { RechercheComponent } from './components/recherche/recherche.component';



const routes :  Routes = [
{path: 'compte', component: CompteComponent},
{path:'paiement', component: PaiementComponent},
{path:'connexion', component: ConnexionComponent},
{path:'inscription', component: InscriptionComponent},
{path:'panier-details', component: PanierDetailsComponent},
{path:'recherche/:mots_cles', component: ListeProduitComponent},
{path:'produits/:id', component: DetailsProduitComponent},
{path:'categorie/:id', component: ListeProduitComponent},
{path:'categorie', component: ListeProduitComponent},
{path:'produits', component: ListeProduitComponent},
{path:'marque', component: MarqueComponent},
{path:'accueil', component: AccueilComponent},
{path:'', component:AccueilComponent},
{path:'**', component:AccueilComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ListeProduitComponent,
    DetailsProduitComponent,
    AccueilComponent,
    MarqueComponent,
    PanierStatutsComponent,
    PanierDetailsComponent,
    InscriptionComponent,
    ConnexionComponent,
    PaiementComponent,
    CompteComponent,
    RechercheComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr-FR'
   },
   {
     provide: DEFAULT_CURRENCY_CODE,
     useValue: 'EUR'
   },
   ProduitService],
  bootstrap: [AppComponent],
})

export class AppModule { }
