import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sooz-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;

  contractTypes = [
      {id: 1, name:'Stage', value:'internship'},
      {id: 2, name:'Intérim', value:'temp'},
      {id: 3, name:'CDD', value:'fixed-term'},
      {id: 4, name:'CDI', value:'permanent'},
      {id: 5, name:'Indépendant', value:'freelance'}
  ]

  constructor(private formBuidler:FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuidler.group({
      id: -1,
      title: '',
      company: '',
      city:'',
      zipcode: 35,
      description:'',
      contract:'',
      salary: 0,
      currency: 'euros',
      startdate: new Date(),
      experience: '',
      status: '',
      area: '',
      field:'',
      publishdate: new Date(),
      lastupdate: new Date()
    });
  }

  createJob() {
    console.log(this.form.value);
  }

}
