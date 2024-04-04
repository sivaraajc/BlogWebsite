import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from './Students';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {



  constructor(private http:HttpClient) { }
   baseurl = 'http://localhost:3000/';

   post(stu:Students):Observable<Students> {
    return this.http.post<Students>(`${this.baseurl}post`,stu);
   }


   login(stu:Students){

    return this.http.post<any>(`${this.baseurl}login`,stu);

   }


   getByName(name:string){
    console.log(name);
    return this.http.get<Students>(`${this.baseurl}getbyName/${name}`);
   }

   postBlog(formData:any): Observable<Blog> {
    return this.http.post<Blog>(`${this.baseurl}postBlog`, formData);
  }

  getByBlog(name:string){
  
    return this.http.get<Blog[]>(`${this.baseurl}getbyBlog/${name}`);
   }

   getByIdBlog(id:string){
  
    return this.http.get<Blog>(`${this.baseurl}getbyIdBlog/${id}`);
   }


   getAllBlog(){

    return this.http.get<Blog[]>(`${this.baseurl}getAllBlog`);
   }

   deleteByBlog(id:string){

    return this.http.delete<Blog>(`${this.baseurl}deleteByBlog/${id}`);

   }

   updateById(id:string,formData:any){

    return this.http.put<Blog>(`${this.baseurl}updateById/${id}`,formData);

   }


  
}
