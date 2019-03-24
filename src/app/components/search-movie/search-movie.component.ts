import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {Observable, Subject} from 'rxjs';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {MoviesResultService} from '../../services/movies-result.service';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.sass']
})
export class SearchMovieComponent implements OnInit {
  typeaheadHideResultsOnBlur = true;
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;

  public search$: Subject<any>;
  public movies$: Observable<any>;
  constructor(
    private movieService: MoviesService,
    private movieResultService: MoviesResultService
  ) {}

  ngOnInit() {
    this.search$ = new Subject();
    this.dataSource = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getFilmsAsObservable(token))
      );
    this.movies$ = this.getSearchMoviesResult();
    this.movies$.subscribe( result => {
      this.movieResultService.changeMovieData(result);
    });
  }
  getFilmsAsObservable(token: string): Observable<any> {
    return this.movieService.searchMovies(token, true).pipe(
      map(film => {
        return film.results;
      })
    );
  }
  public getSearchMoviesResult() {
    return this.search$.pipe(
      switchMap(title => this.movieService.searchMovies(title, true)),
      map(({ results }) => results),
    );
  }
  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.search$.next(e.value);
  }

  public send() {
    this.search$.next(this.asyncSelected);
  }
}
