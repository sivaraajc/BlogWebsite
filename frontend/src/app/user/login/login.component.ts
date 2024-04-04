import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Students } from 'src/app/Students';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  stud:Students=new Students();
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private ser:StudentsService,private rou:Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
  }

  // Your existing login function
  username: string = '';
  password: string = '';
  login() {
    const user = this.loginForm.value as Students;

    console.log(user);
  
    this.ser.login(user).subscribe(
      (res) => {
        if (res.message === "Login Success") {
         alert("login Success");
          this.rou.navigate(['dashboard',{ username: user.username }]);
        } else {
          console.log(res.message);
          this.showErrorAlert(res.message);
        }
      },
      (error) => {
        console.error(error);
        if (error.status === 401) {
          this.showErrorAlert("Invalid username or password.");
        } else if (error.status === 404) {
          this.showErrorAlert("User not found.");
        } else {
          this.showErrorAlert("An error occurred during login. Please try again later.");
        }
      }
    );
    this.username= '';
    this.password= '';
  }
  
  private showErrorAlert(message: string): void {
    alert(message);
    // You can also display the error message on the UI or use a dedicated error handling component.
  }
  
  




  backToRegister() {
this.rou.navigate(['register']);
    }

}
