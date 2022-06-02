import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm)
      this.userService.login(this.loginForm.value).subscribe(() => {
        this.router.navigateByUrl('/catalogue')
      }, (error: any) => {
        console.log(this.loginForm, error);
      }
      );
    else
      console.log("null");
  }
}
