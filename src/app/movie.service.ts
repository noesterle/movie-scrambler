import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Movie} from "./movie";
import {MOVIES} from "./mock-movie";
// Key to be exported from this file can be obtained at https://www.omdbapi.com/apikey.aspx
import {MOVIE_API_KEY} from "./movie-key";
import {NONE_TYPE} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
    })
  };

  dummyMovie: Movie = {
    "Actors": "N/A",
    "Awards": "N/A",
    "BoxOffice": "$-1",
    "Country": "N/A",
    "DVD": "01 Jan 1970",
    "Director": "N/A",
    "Genre": "N/A",
    "Language": "N/A",
    "Metascore": "-1",
    "Plot": "N/A",
    "Poster": ".",
    "Production": "N/a",
    "Rated": "PG-13",
    "Ratings":[
      {Source: "N/A", Value: "-1"},
      { Source: "N/A", Value: "-1" },
      { Source: "N/A", Value: "-1" }
    ],
    "Released": "01 Jan 1970",
    "Response": "False",
    "Runtime": "-1 min",
    "Title": "Dummy Movie",
    "Type": "N/A",
    "Website": "N/A",
    "Writer": "N/A",
    "Year": "1970",
    "imdbID": "N/A",
    "imdbRating": "N/A",
    "imdbVotes": "N/A",
  };

  movieUrlKey = "apikey=".concat(MOVIE_API_KEY);
  // movieURLBase: string = "http://www.omdbapi.com/?i=tt3896198";
  movieURLBase: string = "http://www.omdbapi.com/?";
  // movieSearchParam: string = "t=Fast+Five";
  movieSearchParam: string = "i=tt3896198";
  movieURL = this.movieURLBase.concat(this.movieSearchParam).concat("&").concat(this.movieUrlKey).concat("&plot=full");

  constructor(private http: HttpClient) { }

  getMovie(): Observable<Movie> {
    // this.http.get<Movie[]>(this.movieURL/*, this.movieHttpOptions*/).subscribe(resp => console.log(resp));
    return this.http.get<Movie>(this.movieURL).pipe(
      catchError(this.handleError<Movie>('getMovie', this.dummyMovie))
    );
    // return of(MOVIES);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
