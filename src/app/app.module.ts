import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountUpModule } from 'countup.js-angular2';
import { InViewportModule } from 'ng-in-viewport';
import { BarRatingModule } from 'ngx-bar-rating';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlModule } from 'ngx-owl-carousel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'ngx-alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { StatsComponent } from './stats/stats.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CoursesComponent } from './courses/courses.component';
import { WhatwegiveComponent } from './whatwegive/whatwegive.component';
import { PricingComponent } from './pricing/pricing.component';
import { TeachersComponent } from './teachers/teachers.component';
import { LoginComponent } from './login/login.component';
import { InstructorComponent } from './instructor/instructor.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './services/auth.service';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardCardsComponent } from './dashboard/dashboard-cards/dashboard-cards.component';
import { EditProfileComponent } from './dashboard/edit-profile/edit-profile.component';
import { AddStudentComponent } from './dashboard/add-student/add-student.component';
import { ClassService } from './services/class.service';
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
import { EditStudentClassesComponent } from './dashboard/edit-student-classes/edit-student-classes.component';
import { AssignStudentClassesComponent } from './dashboard/assign-student-classes/assign-student-classes.component';
import { MarkAttendenceComponent } from './dashboard/mark-attendence/mark-attendence.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SlideshowComponent,
    HomepageComponent,
    AboutusComponent,
    StatsComponent,
    TestimonialsComponent,
    CoursesComponent,
    WhatwegiveComponent,
    PricingComponent,
    TeachersComponent,
    LoginComponent,
    InstructorComponent,
    FooterComponent,
    RegisterComponent,
    DashboardAdminComponent,
    DashboardNavbarComponent,
    DashboardCardsComponent,
    EditProfileComponent,
    AddStudentComponent,
    SearchStudentComponent,
    ViewProfileStudentComponent,
    AddTeacherComponent,
    SearchTeacherComponent,
    ViewProfileTeacherComponent,
    AddAssistantComponent,
    SearchAssistantComponent,
    ViewProfileAssistantComponent,
    ViewClassesAssistantComponent,
    AddClassComponent,
    SearchClassComponent,
    EditClassComponent,
    EditStudentClassesComponent,
    AssignStudentClassesComponent,
    MarkAttendenceComponent
  ],
  imports: [
    JwBootstrapSwitchNg2Module,
    NgbModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'left'}),
    InViewportModule,
    CountUpModule,
    BrowserAnimationsModule,
    SlideshowModule,
    BrowserModule,
    BarRatingModule,
    AppRoutingModule,
    SlickCarouselModule,
    OwlModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [AuthService, AuthGuardService, ClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
