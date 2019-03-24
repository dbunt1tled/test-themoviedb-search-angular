import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MoviesService} from './movies.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  static readonly API_KEY = environment.apiKey;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(MoviesService.BASE_URL)) {
      const paramsReq = req.clone({
        params: req.params.set('api_key', ApiInterceptor.API_KEY)
      });
      return next.handle(paramsReq);
    }
    return next.handle(req);
  }
}
