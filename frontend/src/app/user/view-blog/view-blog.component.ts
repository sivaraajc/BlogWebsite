import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/blog';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent  implements OnInit{


  blog:any;
  id:string;

  constructor(private rou:Router,private act:ActivatedRoute,private ser:StudentsService){}

  ngOnInit(): void {


    this.id=this.act.snapshot.params['id'];
    console.log(this.id);
    this.getById();

   
  }


  getById(){

    this.ser.getByIdBlog(this.id).subscribe((res)=>{
      console.log(res);

      this.blog=res;

    })

  }






gotoHome() {
this.rou.navigate(['']);
}

}
