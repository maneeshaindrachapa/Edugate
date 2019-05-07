import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { AddStudentComponent } from './dashboard/add-student/add-student.component';
import { SearchStudentComponent } from './dashboard/search-student/search-student.component';
import { ViewProfileStudentComponent } from './dashboard/view-profile-student/view-profile-student.component';
import { AddTeacherComponent } from './dashboard/add-teacher/add-teacher.component';
import { SearchTeacherComponent } from './dashboard/search-teacher/search-teacher.component';
import { ViewProfileTeacherComponent } from './dashboard/view-profile-teacher/view-profile-teacher.component';

const routes: Routes = [{ path: '', component: HomepageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard]},
{ path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuard] },
{ path: 'addStudent' , component : AddStudentComponent, canActivate: [AuthGuard]},
{ path: 'addTeacher' , component : AddTeacherComponent, canActivate: [AuthGuard]},
{ path: 'searchTeacher' , component : SearchTeacherComponent, canActivate: [AuthGuard]},
{ path: 'searchStudent' , component : SearchStudentComponent, canActivate: [AuthGuard]},
{ path: 'viewProfileStudent' , component : ViewProfileStudentComponent, canActivate: [AuthGuard]},
{ path: 'viewProfileTeacher' , component : ViewProfileTeacherComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
