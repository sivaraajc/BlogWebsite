import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from 'src/app/Students';
import { Blog } from 'src/app/blog';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {


  username: string | null = null;
  user: Students = {
    _id: '',
    username: '',
    password: '',
    age: 0,
    gender: '',
    mobile: 0
  };

  

  registrationForm: FormGroup;

  constructor(private act: ActivatedRoute, private ser: StudentsService, private rou: Router, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      mobile: new FormControl(''),
      image: [null, Validators.required],
      
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registrationForm.patchValue({
          image: reader.result
        });
      };
    }
  }
  

  ngOnInit(): void {
    this.act.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username);
      this.getByname();
    });
  }

  getByname() {
    if (this.username !== null) {
      this.ser.getByName(this.username).subscribe(
        (res) => {
          if (res !== null) {
            this.user = res;
            console.log(this.user);

            // Initialize the form only when user data is available
            this.initForm();
          } else {
            console.error('Received null response from getByName API.');
          }
        },
        (error) => {
          console.error('Error in getByName API:', error);
        }
      );
    } else {
      console.error('Username is null. Cannot call getByname.');
    }
  }

  initForm() {
    // Check if user is defined before initializing the form
    if (this.user) {

    
      this.registrationForm = this.fb.group({
        title: new FormControl('', [Validators.required]),
        content: new FormControl('', [Validators.required]),
        location: new FormControl('', [Validators.required]),
        experience: new FormControl('', [Validators.required]),
        username: new FormControl(this.user.username),
        mobile: new FormControl(this.user.mobile),
        image: new FormControl('',[Validators.required]),
       
      });
    }
  }

  register() {
    if (this.registrationForm) {
      const blogData = this.registrationForm.value as Blog;
      console.log('Blog Data:', blogData); // Check the form data before sending
  
      this.ser.postBlog(blogData).subscribe(
        (res) => {
          console.log('Post Blog Response:', res);
          this.rou.navigate(["dashboard", { username: this.user.username }]);
        },
        (error) => {
          console.error('Error posting blog:', error);
        }
      );
    }
  }
  

  gotoDashboard() {
    this.rou.navigate(["dashboard", { username: this.user.username }]);
  }


  
}
