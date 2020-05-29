import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";
import {Movie} from "../movie";
import {MessageService} from "../message.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  subscription: Subscription;
  private message: any;
  movies: Movie[] = Array(0);

  constructor(private movieService: MovieService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message.type == "search") {
        this.message = message;
        this.searchForMovie(message.text);
      }
    });
  }

  getMovie(): void {
    this.movieService.getMovie().subscribe(movie => {this.movies = [movie]/*; console.log(this.movies)*/});
  }

  searchForMovie(title:string): void {
    if (title != "") {
      this.movieService.searchMovie(title).subscribe(movie => {
        this.movies = [movie];
        console.log(this.movies);
      });
    }
  }

  ngOnInit(): void {
    // this.getMovie();
   this.searchForMovie("Test");
    // this.searchForMovie("");
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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
