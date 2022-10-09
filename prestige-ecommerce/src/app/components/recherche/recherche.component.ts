import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/recherche/${value}`);
  }

}
