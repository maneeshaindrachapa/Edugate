import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CountUpModule } from 'countup.js-angular2';
import { InViewportModule } from 'ng-in-viewport';
import { BarRatingModule } from 'ngx-bar-rating';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OwlModule } from 'ngx-owl-carousel';

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
    RegisterComponent
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
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
