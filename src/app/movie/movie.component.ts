import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";
import {Movie} from "../movie"; //npm's remove-markdown

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[];
  constructor(private movieService: MovieService) {  }

  getMovie(): void {
    this.movieService.getMovie().subscribe(movie => {this.movies = [movie]/*; console.log(this.movies)*/});
  }

  ngOnInit(): void {
    this.getMovie();
  }

}
