import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ApplicationConfigurations } from 'src/app/config/application-configurations';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionFormGroup: FormGroup;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
              private formBuilder: FormBuilder) { 
    this.connexionFormGroup= this.formBuilder.group({
      client: new FormControl

    });
  }

  ngOnInit(): void {
  }

}
