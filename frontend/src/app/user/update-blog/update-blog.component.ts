// update-blog.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Students } from 'src/app/Students';
import { Blog } from 'src/app/blog';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  id: string;
  blog: Blog;

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
    this.id = this.act.snapshot.params['id'];
    this.getByIdBlog();
  }

  getByIdBlog() {
    this.ser.getByIdBlog(this.id).subscribe((res) => {
      // Check if there is at least one blog entry in the response array
      if (Array.isArray(res) && res.length > 0) {
        // Access the first blog entry
        this.blog = res[0];
  
        console.log('Blog data:', this.blog);
  
        // Assuming you have a user associated with the blog (adjust this logic based on your app's structure)
        if (this.blog.username) {
          this.username = this.blog.username; // Update the username with the data associated with the blog
        }
  
        // Log the values being set to form controls
        console.log('Title:', this.blog.title);
        console.log('Content:', this.blog.content);
        console.log('Location:', this.blog.location);
        console.log('Experience:', this.blog.experience);
        console.log('Username:', this.blog.username);
        console.log('Mobile:', this.blog.mobile);
        console.log('Image:', this.blog.image);
  
        // Set values for each form control individually
        this.registrationForm.get('title')?.setValue(this.blog.title || '');
        this.registrationForm.get('content')?.setValue(this.blog.content || '');
        this.registrationForm.get('location')?.setValue(this.blog.location || '');
        this.registrationForm.get('experience')?.setValue(this.blog.experience || '');
        this.registrationForm.get('username')?.setValue(this.blog.username || '');
        this.registrationForm.get('mobile')?.setValue(this.blog.mobile || '');
        this.registrationForm.get('image')?.setValue(this.blog.image || null);
  
        // Call initForm to initialize form controls based on the user object
        this.initForm();
      } else {
        console.error('No blog entry found in the response.');
      }
    });
  }
  
  
  
  updateId() {
    if (this.registrationForm) {
      const blogData = this.registrationForm.value as Blog;
      console.log('Blog Data:', blogData); // Check the form data before sending

      this.ser.updateById(this.id,blogData).subscribe(
        (res) => {
          console.log('Post Blog Response:', res);
          this.rou.navigate(["dashboard", { username: this.blog.username }]);
        },
        (error) => {
          console.error('Error posting blog:', error);
        }
      );
    }
  }

  initForm() {
    // Update individual controls based on the user data
    if (this.blog) {
      this.registrationForm.get('username')?.setValue(this.blog.username);
      this.registrationForm.get('mobile')?.setValue(this.blog.mobile);
    }
  }

  gotoDashboard() {
    this.rou.navigate(["dashboard", { username: this.blog.username }]);
  }
}
