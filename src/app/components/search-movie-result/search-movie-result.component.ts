import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {MoviesResultService} from '../../services/movies-result.service';
import {MoviesService} from '../../services/movies.service';

@Component({
  selector: 'app-search-movie-result',
  templateUrl: './search-movie-result.component.html',
  styleUrls: ['./search-movie-result.component.sass']
})
export class SearchMovieResultComponent implements OnInit {
  public movies: Observable<any>;
  public readonly imgUrl = MoviesService.IMAGE_URL;
  constructor(
    private movieResultService: MoviesResultService
  ) { }
  ngOnInit() {
    this.movies = this.movieResultService.moviesData;
  }
}
