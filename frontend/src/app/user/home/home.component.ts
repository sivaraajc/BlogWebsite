import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/blog';
import { StudentsService } from 'src/app/students.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  blog: Blog[];


  constructor(private ser:StudentsService,private rou:Router){}


  ngOnInit(): void {

    this.getAll();
  
  }

  getAll(){

    this.ser.getAllBlog().subscribe((res)=>{

      this.blog=res;

    });


  }

  gotoGetPage(id:string){
    this.rou.navigate(['view',id]);

  }



}
