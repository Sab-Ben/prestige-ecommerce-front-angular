import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prestige-ecommerce';
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor() {}

  ngOnInit(): void {

    
  }
}
