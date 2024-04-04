import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"register",component:RegisterComponent},{
    path:"login",component:LoginComponent
  },{path:"dashboard",component:DashboardComponent},
  {path:"postblog",component:PostBlogComponent},
  {path:"updateBlog/:id",component:UpdateBlogComponent},
  {path:"deleteBlog/:id",component:DeleteBlogComponent},
  {path:"view/:id",component:ViewBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
