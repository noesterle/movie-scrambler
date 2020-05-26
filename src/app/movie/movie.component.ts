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
    let regExp: RegExp = /[.,?!]$/;
    for (let i in this.movies) {
      let plot = this.movies[i].Plot.split(" ");
      // let plot = "lovely. day! take...".split(" ");
      // let plot = "lovely day take".split(" ");
      let scrambledTemp = newArray(plot.length);
      let punctuation:string[] = newArray(plot.length).fill("");

      for (let j in plot) {
        let word = plot[j];

        console.log(word);
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
          console.log(respWord);
          console.log(respWord.synonyms.length)
          if (respWord.synonyms.length == 0) { // There are no synonyms, use the word.
            scrambledTemp[j] = word;
          }
          else {
            let rand = Math.floor(Math.random() * respWord.synonyms.length);
            scrambledTemp[j] = respWord.synonyms[rand];
          }
          scrambledTemp[j] = scrambledTemp[j]+punctuation[j];
          console.log(scrambledTemp);

          this.scrambledPlots[i] = scrambledTemp.join(" ");
        });
      }
    }
  }

  ngOnInit(): void {
    this.getMovie();
  }

}
