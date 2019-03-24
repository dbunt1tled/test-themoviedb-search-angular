import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesResultService {
  private moviesData$ = new BehaviorSubject([]);
  public moviesData = this.moviesData$.asObservable();
  constructor() { }

  changeMovieData(data) {
    console.log(data);
    this.moviesData$.next(data);
  }

}
