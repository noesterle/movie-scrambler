import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";
import {Movie} from "../movie";
import {WordsService} from "../words.service";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[];
  scrambledPlots: string[];
  constructor(private movieService: MovieService, private wordsService: WordsService) {  }

  getMovie(): void {
    this.movieService.getMovie().subscribe(movie =>
    {
      this.movies = [movie];
      this.getNewPlot();
    });
  }

  getNewPlot(): void {
    this.scrambledPlots = newArray(this.movies.length)
    // this.wordsService.getSynonyms(this.movies).subscribe(scrambledPlots => this.scrambledPlots = scrambledPlots);
    console.log(this.movies)
    for (let i in this.movies) {
      // let plot = movies[i].Plot.split(" ");
      let plot = "lovely day take".split(" ");
      let scrambledTemp = newArray(plot.length);
      for (let j in plot) {
        let word = plot[j];

        this.wordsService.getSynonym(word).subscribe(respWord => {
          let rand = Math.floor(Math.random()*respWord.synonyms.length);
          scrambledTemp[j] = respWord.synonyms[0];
          // scrambledTemp[j] = "test";
          console.log(scrambledTemp);
        });
      }
      console.log(scrambledTemp.join(" "));
      // this.scrambledPlots[i] = "testtest";
      this.scrambledPlots[i] = scrambledTemp.join(" "); //Seems like this is being applied before subscribe receives the info.
    }
  }

  ngOnInit(): void {
    this.getMovie();
  }

}
