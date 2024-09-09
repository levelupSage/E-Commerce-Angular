import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';
import { UserStorageService } from '../service/storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private snackBar : MatSnackBar,
    private router : Router 
  ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [null, [Validators.required]],
      password : [null, [Validators.required]],
    })
  }  
  
  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    //debugger
    const userName = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(userName,password).subscribe(
      (res) =>{
        // this.snackBar.open('login Success', 'Ok', {duration: 5000 });
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('customer/dashboard')
        }
      },
      (error) => {
        this.snackBar.open('Bad Credentials', 'Error', {duration: 5000 });
      }
    )
  }
}
