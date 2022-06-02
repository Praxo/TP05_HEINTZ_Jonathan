import { UserService } from './../../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      // prenom: new FormControl('', Validators.required),
      // nom: new FormControl('', Validators.required),
      // adresse: new FormControl('', Validators.required),
      // ville: new FormControl('', Validators.required),
      // codePostal: new FormControl('', Validators.required),
      // pays: new FormControl('', Validators.required),
      // telephone: new FormControl('', Validators.required),
      // civilite: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm)
      this.userService.register(this.registerForm.value).subscribe(() => {
        this.router.navigateByUrl('/signup/')
      }, (error: any) => {
        console.log(error);
      }
      );
    else
      console.log("null");
  }
}
