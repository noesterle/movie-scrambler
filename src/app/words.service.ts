import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {Movie} from "./movie";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {newArray} from "@angular/compiler/src/util";
import {WORDS_API_HOST, WORDS_API_KEY} from "./keys"
import {Word} from "./word"

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  // TODO Need to write headers for HTTP request with APIv and API Key
  wordsURLBase = "https://wordsapiv1.p.rapidapi.com/words"
  wordToQuery  = "lovely";
  wordsEndPoint = "synonyms";
  // wordsURL = this.wordsURLBase.concat("/").concat(this.wordToQuery).concat("/").concat(this.wordsEndPoint);

  wordHttpOptions = {
    headers: new HttpHeaders({
      'x-rapidapi-host': WORDS_API_HOST,
      'x-rapidapi-key': WORDS_API_KEY,
    })
  };

  dummyWord: Word = {
    "word":"lovely",
    "synonyms": ["adorable","endearing","cover girl","pin-up"]
  }

  constructor(private http: HttpClient) { }

  getSynonyms(movies: Movie[]): Observable<string[]>{
    let scrambleds:string[] = newArray(movies.length)
    for (let i in movies){
      // let plot = movies[i].Plot.split(" ");
      let plot = "lovely day take".split(" ");
      let scrambled:string[] = newArray(plot.length);
      for (let ind in plot){
        let wordsURL = this.wordsURLBase.concat("/").concat(plot[ind]).concat("/").concat(this.wordsEndPoint);
        // let wordsURL = "";
        // this.http.get<any>(wordsURL,this.wordHttpOptions).subscribe(resp => console.log(resp.headers.get('x-ratelimit-requests-remaining')))
        this.http.get<any>(wordsURL,this.wordHttpOptions).subscribe(resp => {
          console.log(resp);
          let rand = Math.floor(Math.random()*resp.synonyms.length);
          scrambled[ind] = resp.synonyms[rand];

          scrambleds[i] = scrambled.join(" ");
        });
         // this.http.get<string[]>(wordsURL).pipe(
         //   catchError(this.handleError<string[]>('getSynonyms', [""]))
        // );
      }
    }
    return of(scrambleds);
    // return of(["asdf"]);
  }

  getSynonym(word: string): Observable<Word>{
    let wordsURL = this.wordsURLBase.concat("/").concat(word).concat("/").concat(this.wordsEndPoint);
    // return this.http.get<string>(wordsURL,this.wordHttpOptions).pipe(resp => resp.synonyms[Math.floor(Math.random()*resp.synonyms.length)]);
    return this.http.get<Word>(wordsURL, this.wordHttpOptions).pipe(
      catchError(this.handleError<Word>('getSynonym', word))
    );
    // return of("test")
  }

  private handleError<T> (operation = 'operation', result?: string) {
    return (error: any): Observable<Word> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      let errorWord: Word = {
        "word": result,
        "synonyms": [result]
      };

      // Let the app keep running by returning an empty result.
      return of(errorWord);
    };
  }
}
