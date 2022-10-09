import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Inscription } from 'src/app/common/inscription';
import { InscriptionService } from 'src/app/services/inscription.service';
import { PrestigeValidators } from 'src/app/validators/prestige-validators';
import { PasswordStrengthValidator } from "src/app/validators/password-strength.validators"


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriptionFormGroup! : FormGroup;

  constructor(private formBuilder : FormBuilder,
              private inscriptionService: InscriptionService,
              private router: Router) { }

  ngOnInit(): void {
    this.inscriptionFormGroup = this.formBuilder.group({
      client: this.formBuilder.group({
        prenom: new FormControl('', [Validators.required, Validators.minLength(2), PrestigeValidators.notOnlyWhitespace]),
        nom: new FormControl('', [Validators.required, Validators.minLength(2), PrestigeValidators.notOnlyWhitespace]),
        email: new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), PrestigeValidators.notOnlyWhitespace]),
        motDePasse: new FormControl('',[Validators.required, PasswordStrengthValidator, PrestigeValidators.notOnlyWhitespace]),
        telephone: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), PrestigeValidators.notOnlyWhitespace])
      }),
  
});

}
get prenom() { return this.inscriptionFormGroup.get('client.prenom');}
get nom() { return this.inscriptionFormGroup.get('client.nom');}
get email() { return this.inscriptionFormGroup.get('client.email');}
get motDePasse() { return this.inscriptionFormGroup.get('client.motDePasse');}
get telephone(){ return this.inscriptionFormGroup.get('client.telephone');}

onSubmit() {
  if (this.inscriptionFormGroup.invalid) {
    this.inscriptionFormGroup.markAllAsTouched();
    return;
  }

  let inscription = new Inscription();
  inscription.utilisateur =  this.inscriptionFormGroup.controls['client'].value
  

 this.inscriptionService.confirmationInscription(inscription).subscribe({

  next:response => {
    let utilisateur = response.confirmationInscription;
    alert(`Votre inscription a bien été enregistrée : ${utilisateur.prenom}`); 
    this.router.navigate(['/paiement']);
 },

 error:erreur => {
  alert(`Il y a une erreur: ${erreur.message}`);
    },
  }
 );
}

}
