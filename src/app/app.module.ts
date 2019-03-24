import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MoviesService} from './services/movies.service';
import {ApiInterceptor} from './services/api.interceptor';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import { SearchMovieResultComponent } from './components/search-movie-result/search-movie-result.component';
import { DateFormatsPipe } from './pipes/date-formats.pipe';
import {RatingModule, TypeaheadModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SearchMovieComponent,
    NavbarComponent,
    SearchMovieResultComponent,
    DateFormatsPipe
  ],
  imports: [
    BrowserModule,
    TypeaheadModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MoviesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
