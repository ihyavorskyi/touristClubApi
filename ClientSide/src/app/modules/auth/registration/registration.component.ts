import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/data/models/auth/registration-request';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.clearStorage();
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      firstName: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      lastName: ['', [Validators.required, Validators.pattern('^(?!\\s*$).+')]],
      age: ['', [Validators.required, Validators.pattern('^\\S[0-9]{0,3}$')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      confirmedPassword: ['', [Validators.required]]
    });
  }

  registrationSubmit() {
    const model: RegistrationRequest = {
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      username: this.registerForm.get('username').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      age: Number(this.registerForm.get('age').value),
      confirmedPassword: this.registerForm.get('confirmedPassword').value
    };
    console.log(model);

    this.authService.register(model).subscribe(value => {
      this.router.navigateByUrl('/auth/login');
    }, error => {
      console.log(error);
    });
  }
}
