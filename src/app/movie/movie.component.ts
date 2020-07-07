import { Component, OnInit } from '@angular/core';
import {MovieService} from "../movie.service";
import {Movie} from "../movie";
import {MessageService} from "../message.service";
import {Subscription} from "rxjs"
import {WordsService} from "../words.service";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  subscription: Subscription;
  private message: any;
  movies: Movie[] = Array(0);
  scrambledPlots: string[];
  displayPosters: boolean = false
  showMovie: boolean = false;
  movieSearchError = false;

  constructor(private movieService: MovieService, private messageService: MessageService, private wordsService: WordsService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      // console.log("GOT A MESSAGE: " + message.type + " " + message.text);
      if (message.type == "search" && (this.message ===  undefined || this.message.text !== message.text)) {
        this.message = message;
        // console.log("HAVE A MESSAGE: " + this.message.type + " " + this.message.text);
        this.searchForMovie(message.text);
      }
    });
  }

  getNewPlot(): void {
    this.scrambledPlots = newArray(this.movies.length)
    let regExp: RegExp = /[.,?!:]$/;
    for (let i in this.movies) {
      let plot = this.movies[i].Plot.split(" ");
      // let plot = "lovely. day! take...".split(" ");
      // let plot = "lovely day take".split(" ");
      let scrambledTemp = newArray(plot.length);
      let punctuation:string[] = newArray(plot.length).fill("");

      for (let j in plot) {
        let word = plot[j];

        // console.log(word);
        if (regExp.test(word)) { // if there's punctuation
          let punctuationIndex = -1;
          for (let k = word.length-1; k > 0; k--) { //find punctuation at the end of the word by searching from the end
            if (!word.charAt(k).match(regExp)) {
              punctuationIndex = k+1;
              break;
            }
          }

          //Separate letters and trailing punctuation
          punctuation[j] = word.slice(punctuationIndex);
          word=word.slice(0,punctuationIndex);

          // console.log("Post Punct Slice");
          // console.log(word);
          // console.log(punctuation);
        }

        this.wordsService.getSynonym(word).subscribe(respWord => {
          // console.log(respWord);
          // console.log(respWord.synonyms.length)
          if (respWord.synonyms.length == 0) { // There are no synonyms, use the word.
            scrambledTemp[j] = word;
          }
          else {
            let rand = Math.floor(Math.random() * respWord.synonyms.length);
            scrambledTemp[j] = respWord.synonyms[rand];
          }
          scrambledTemp[j] = scrambledTemp[j]+punctuation[j];
          // console.log(scrambledTemp);

          this.scrambledPlots[i] = scrambledTemp.join(" ");
        });
      }
    }
  }

  searchForMovie(title:string): void {
    if (title != "") {
      this.movieService.searchMovie(title).subscribe(
        (movie) => {
          if (movie.Response == "True") {
            // console.log("Movie found.")
            this.movies = [movie];
            this.showMovie = true;
            this.movieSearchError = false;

            // Swap which lines are commented below to enable or disable synonyms nicely.
            this.getNewPlot();
            // this.scrambledPlots = ['Scrambled Plat Filler']
          }
          else if (movie.Response == "False"){
            // console.log("Movie not found.")
            this.showMovie = false;
            this.movieSearchError = true;
          }
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      // console.log("No Movie searched for.")
      this.showMovie = false;
      this.movieSearchError = false;
    }
  }

  ngOnInit(): void {
   // this.searchForMovie("Test");
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  erasePlot(plot: string) {
    for (let movie of this.movies) {
      if (movie.Plot == plot) {
        movie.Plot = "";
      }
    }
    plot = "";
  }

  displayPoster() {
    console.log("TOGGLE DISPLAY POSTER");
    this.displayPosters = !this.displayPosters;
  }

}
