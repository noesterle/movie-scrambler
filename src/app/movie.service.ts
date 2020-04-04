import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Movie} from "./movie";
import {MOVIES} from "./mock-movie";
// Key to be exported from this file can be obtained at https://www.omdbapi.com/apikey.aspx
import {MOVIE_API_KEY} from "./movie-key";

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

  movieUrlKey = "apikey=".concat(MOVIE_API_KEY);
  movieURL: string = "http://www.omdbapi.com/?i=tt3896198".concat("&").concat(this.movieUrlKey).concat("&plot=full");

  constructor(private http: HttpClient) { }

  getMovie(): Observable<Movie[]> {
    // this.http.get<Movie[]>(this.movieURL/*, this.movieHttpOptions*/).subscribe(resp => console.log("Hi there!"));
    // return this.http.get<Movie[]>(this.logURL).pipe(
    //   catchError(this.handleError<Movie[]>('getLog', []))
    // );
    return of(MOVIES);
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
