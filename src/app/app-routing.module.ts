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
import { AddAssistantComponent } from './dashboard/add-assistant/add-assistant.component';
import { SearchAssistantComponent } from './dashboard/search-assistant/search-assistant.component';
import { ViewProfileAssistantComponent } from './dashboard/view-profile-assistant/view-profile-assistant.component';
import { ViewClassesAssistantComponent } from './dashboard/view-classes-assistant/view-classes-assistant.component';
import { AddClassComponent } from './dashboard/add-class/add-class.component';
import { SearchClassComponent } from './dashboard/search-class/search-class.component';
import { EditClassComponent } from './dashboard/edit-class/edit-class.component';

const routes: Routes = [{ path: '', component: HomepageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard]},
{ path: 'editprofile', component: EditProfileComponent, canActivate: [AuthGuard] },
{ path: 'addStudent' , component : AddStudentComponent, canActivate: [AuthGuard]},
{ path: 'addTeacher' , component : AddTeacherComponent, canActivate: [AuthGuard]},
{ path: 'addAssistant' , component : AddAssistantComponent, canActivate: [AuthGuard]},
{ path: 'addClass' , component : AddClassComponent, canActivate: [AuthGuard]},
{ path: 'searchTeacher' , component : SearchTeacherComponent, canActivate: [AuthGuard]},
{ path: 'searchStudent' , component : SearchStudentComponent, canActivate: [AuthGuard]},
{ path: 'searchAssistant' , component : SearchAssistantComponent, canActivate: [AuthGuard]},
{ path: 'searchClass' , component : SearchClassComponent, canActivate: [AuthGuard]},
{ path: 'viewProfileStudent' , component : ViewProfileStudentComponent, canActivate: [AuthGuard]},
{ path: 'viewProfileTeacher' , component : ViewProfileTeacherComponent, canActivate: [AuthGuard]},
{ path: 'viewProfileAssistant' , component : ViewProfileAssistantComponent, canActivate: [AuthGuard]},
{ path: 'viewClassesAssistant' , component : ViewClassesAssistantComponent, canActivate: [AuthGuard]},
{ path: 'editClass', component: EditClassComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
