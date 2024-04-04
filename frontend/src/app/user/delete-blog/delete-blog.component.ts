import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit{

  id:string;

  constructor(private act:ActivatedRoute,private ser:StudentsService,private rou:Router){}

  ngOnInit(): void {

   this.id= this.act.snapshot.params['id'];
  this.deleteByBlog();
  }


  deleteByBlog(){

    this.ser.deleteByBlog(this.id).subscribe((res)=>{
      this.rou.navigate(['dashboard']);

    });

  }

}
