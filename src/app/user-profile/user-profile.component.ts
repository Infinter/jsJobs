import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';


@Component({
  selector: 'sooz-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  decodedToken = null;
  isAdmin = false;
  userEmail = '';
  userJobs = [];
  adsTitle = '';

  constructor(private authService: AuthService, private jobService: JobService) { }

  ngOnInit() {
    if (this.authService.userIsLoggedIn()) {
      const jbbToken = JSON.parse(localStorage.getItem('jbb-data'));
      this.decodedToken = this.authService.decodeToken(jbbToken.token);
      console.log(this.decodedToken);
      if (this.decodedToken && this.decodedToken.role === 'admin') {
        this.isAdmin = true;
      }
      this.userEmail = this.decodedToken.email;
      if (this.isAdmin) {
        this.loadAllJobs();
      } else {
        this.loadJobs(this.userEmail);
      }

    }
  }

  loadJobs(userEmail) {
    this.jobService.getJobsByUserEmail(userEmail)
      .subscribe(
      data => this.displayJobs(data.jobs),
      error => console.error(error)
      );
  }

  loadAllJobs() {
    this.jobService.getJobs()
      .subscribe(
      data => this.displayJobs(data),
      error => console.error(error)
      );
  }

  displayJobs(jobs) {
    this.userJobs = jobs;
    switch (this.userJobs.length) {
      case 0:
        this.adsTitle = 'Aucune annonce postée à ce jour';
        return;
      case 1:
        this.adsTitle = '1 annonce postée';
        return;
      default:
        this.adsTitle = `${this.userJobs.length} annonces postées`;
        return;
    }
  }
}
