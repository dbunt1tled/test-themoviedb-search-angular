import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  static readonly BASE_URL = environment.baseUrl;
  static readonly IMAGE_URL = environment.imgUrl;
  public lang = environment.language;
  constructor(
    private _http: HttpClient
  ) { }
  public searchMovies(term: string, include_adult: boolean, year = ''): Observable<any> {
    const params = new HttpParams()
      .set('query', term)
      .set('language', this.lang)
      .set('include_adult', include_adult.toString())
    ;
    if (year) {
      params.set('year', year);
    }
    return this._http.get(`${MoviesService.BASE_URL}/search/movie`, {params});
  }
}
