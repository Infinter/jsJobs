import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'sooz-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  jbbData = null;
  isAuthenticated = false;
  welcomeMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()){
      
      this.refreshFlags(JSON.parse(localStorage.getItem('jbb-data')));
    }
  }

refreshFlags(data) {
  this.jbbData = data;
  this.isAuthenticated = true;
  this.welcomeMessage = 'Bienvenue';
}

  login(formData) {
    console.log(formData);
    this.authService.login(formData)
      .subscribe(data => this.handleLoginSuccess(data),
      error => this.handleLoginFailure(error))
  }
  handleLoginSuccess(data) {
    console.log('success', data);
    this.refreshFlags(data);
    localStorage.setItem('jbb-data', JSON.stringify(data));

  }
  handleLoginFailure(error) {
    console.error('failure', error);
  }
}
