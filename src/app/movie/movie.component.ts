import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";
import {Movie} from "../movie"; //npm's remove-markdown

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] = Array(0);
  constructor(private movieService: MovieService) {  }

  getMovie(): void {
    this.movieService.getMovie().subscribe(movie => {this.movies = [movie]/*; console.log(this.movies)*/});
  }

  searchForMovie(title:string): void {
    if (title != "") {
      this.movieService.searchMovie(title).subscribe(movie => {
        this.movies = [movie];
        console.log(movie);
        console.log(this.movies);
      });
    }
  }

  ngOnInit(): void {
    // this.getMovie();
   this.searchForMovie("Test");
    // this.searchForMovie("");
  }

  erasePlot(plot: string) {
    console.log("ERASE PLOT");
    for (let movie of this.movies) {
      if (movie.Plot == plot) {
        movie.Plot = "";
      }
    }
    plot = "";
  }

}
