import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'sooz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(formData) {
    this.authService.register(formData)
      .subscribe(
        data => this.handleRegisterSucces(data),
        error => this.handleRegisterFailure(error)
      );
  };

  handleRegisterSucces(data){
    this.router.navigate(['/']);
  };

  handleRegisterFailure(error){
    console.error('failure ', error);
  };
}
