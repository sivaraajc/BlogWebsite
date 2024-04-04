import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Students } from 'src/app/Students';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private ser: StudentsService, private route:Router) {
    this.registrationForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      gender: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    });
  }
  ngOnInit(): void {
    
  }

  register() {
  
      // Add your registration logic here
      const reg = this.registrationForm.value as Students
      this.ser.post(reg).subscribe((res)=>{
        
        this.route.navigate(['login']);
      })
     
  }
  cancel(){
    this.route.navigate(["login"]);
  }


}
