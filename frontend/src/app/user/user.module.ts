import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { DeleteBlogComponent } from './delete-blog/delete-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    PostBlogComponent,
    ViewBlogComponent,
    UpdateBlogComponent,
    DeleteBlogComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,ReactiveFormsModule,RouterModule
  ]
})
export class UserModule { }
