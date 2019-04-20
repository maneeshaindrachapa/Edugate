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
    SearchStudentComponent
  ],
  imports: [
    NgbModule,
    InViewportModule,
    CountUpModule,
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
