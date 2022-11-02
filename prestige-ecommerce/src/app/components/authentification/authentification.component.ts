import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Authentification } from 'src/app/common/authentification';
import { PrestigeValidators } from 'src/app/validators/prestige-validators';
import { Router } from '@angular/router';
import { PasswordStrengthValidator } from 'src/app/validators/password-strength.validators';


@Component({
  selector: 'app-connexion',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class ConnexionComponent implements OnInit {

  authentificationFormGroup! : FormGroup;
  storage: Storage = sessionStorage;

  constructor(private formBuilder: FormBuilder,
              private authentificationService : AuthentificationService,
              private router: Router) { 
  }

  ngOnInit(): void {
    this.authentificationFormGroup = this.formBuilder.group({
      client: this.formBuilder.group({
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), PrestigeValidators.notOnlyWhitespace]),
        motDePasse: new FormControl('',[Validators.required, PasswordStrengthValidator, PrestigeValidators.notOnlyWhitespace])
      }),
  });
}

get email() { return this.authentificationFormGroup.get('client.email');}
get motDePasse() { return this.authentificationFormGroup.get('client.motDePasse');}


  onSubmit(){
    let authentification = new Authentification();
    authentification.utilisateur =  this.authentificationFormGroup.controls['client'].value
    this.authentificationService.connexionSuccessMessage(authentification).subscribe({

      next:response => {
        alert(`Vous êtes bien connecté : ${response.connexionSuccessMessage}`); 
        this.storage.setItem('utilisateur',JSON.stringify(response['utilisateur']));
        this.storage.setItem('adresses',JSON.stringify(response['adresses']));
        this.storage.setItem('commandes',JSON.stringify(response['commandes']));
        this.router.navigateByUrl('/compte', {state : response['utilisateur']}); 
      },
    
    error:erreur => {
      alert(`Il y a une erreur: votre compte n'existe pas.`);
      this.router.navigate(['/connexion']);
        },
      }
    );
  }
}

