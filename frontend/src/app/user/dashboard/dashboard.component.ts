import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from 'src/app/Students';
import { Blog } from 'src/app/blog';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  username: string | null = null;
  user: Students;
  blog: Blog[]; // Change the type to a single Blog instead of an array

  constructor(private act: ActivatedRoute, private ser: StudentsService, private rou: Router) { }

  ngOnInit(): void {
    this.act.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username);
      this.getByname();
    });
   this.getByBlog();
  }

  getByname() {
    if (this.username !== null) {
      this.ser.getByName(this.username).subscribe(
        (res) => {
          if (res !== null) {
            this.user = res;
            console.log(this.user);
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

  postBlog() {
    this.rou.navigate(['postblog', { username: this.user.username }]);
  }

  getByBlog() {
    if (this.username !== null) {
      this.ser.getByBlog(this.username).subscribe(
        (res) => {
          if (res !== null) {
            // Assuming that res is an array, you might need to select a specific item
            this.blog = res; // Change this line if res is an array with multiple items
            console.log(this.blog);
          } else {
            console.error('Received null response from getByBlog API.');
          }
        },
        (error) => {
          console.error('Error in getByBlog API:', error);
        }
      );
    } else {
      console.error('Username is null. Cannot call getByBlog.');
    }
  }



  DeleteById(id: string) {

    this.ser.deleteByBlog(id).subscribe((res)=>{
      this.blog = this.blog.filter(blogItem => blogItem._id !== id);
      // Reload the page (use it carefully as it will refresh the entire page)
      location.reload();
     
    })

  
  
    }
    updateById(id: string) {
      this.rou.navigate(['updateBlog',id]);
  
    }




}
