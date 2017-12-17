import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sooz-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.userIsLoggedIn()){
      const jbbToken = JSON.parse(localStorage.getItem('jbb-data'));
      this.decodedToken = this.authService.decodeToken(jbbToken.token);
      console.log(this.decodedToken);
    }
  }


}
