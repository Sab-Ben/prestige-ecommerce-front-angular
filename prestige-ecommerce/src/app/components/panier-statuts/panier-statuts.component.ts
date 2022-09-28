import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier-statuts',
  templateUrl: './panier-statuts.component.html',
  styleUrls: ['./panier-statuts.component.css']
})
export class PanierStatutsComponent implements OnInit {

  totalPrix: number = 0;
  totalQuantite: number = 0;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.updatePanierStatus();
  }
  updatePanierStatus() {
    // suivre les événements du totalPrix
  this.panierService.totalPrix.subscribe(
    data => this.totalPrix = data
  );

    // suivre les événement du totalQuantité
    this.panierService.totalQuantite.subscribe(
      data => this.totalQuantite = data
    );
  }

}
