import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PrestigeValidators } from 'src/app/validators/prestige-validators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionFormGroup! : FormBuilder;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  
}

}
