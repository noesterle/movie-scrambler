import { Injectable } from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Movie} from "./movie";
import {MOVIES} from "./mock-movie";
// Key to be exported from this file can be obtained at https://www.omdbapi.com/apikey.aspx
import {MOVIE_API_KEY} from "./keys";
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
    // console.log("GETTING MOVIE");
    return this.http.get<Movie>(this.movieURL).pipe(
      catchError(this.handleError<Movie>('getMovie', this.dummyMovie))
    );
    // return of(MOVIES);
  }

  searchMovie(title: string): Observable<Movie> {
    //TODO: Does not update the webpage when triggered by the Submit button.

    // this.http.get<Movie[]>(this.movieURL/*, this.movieHttpOptions*/).subscribe(resp => console.log(resp));
    // console.log("SEARCHING FOR MOVIE:" + title);

    let localMovieSearchParam:string = this.formatSearchParam(title);
    // console.log("TITLE FOR URL:" + localMovieSearchParam);
    this.movieURL = this.movieURLBase.concat("t="+localMovieSearchParam).concat("&").concat(this.movieUrlKey).concat("&plot=full");

    return this.http.get<Movie>(this.movieURL).pipe(
      catchError(this.handleError<Movie>('searchMovie', this.dummyMovie))
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

  private formatSearchParam(title: string): string {
    // https://secure.n-able.com/webhelp/NC_9-1-0_SO_en/Content/SA_docs/API_Level_Integration/API_Integration_URLEncoding.html
    // console.log("Before Subs: " + title);
    title = title.replace(new RegExp("\\$",'g'), "%24");
    title = title.replace(new RegExp("&",'g'), "%26");
    title = title.replace(new RegExp("\\+",'g'), "%2B");
    title = title.replace(new RegExp(",",'g'), "%2C");
    title = title.replace(new RegExp("/",'g'), "%2F");
    title = title.replace(new RegExp(":",'g'), "%3A");
    title = title.replace(new RegExp(";",'g'), "%3B");
    title = title.replace(new RegExp("=",'g'), "%3D");
    title = title.replace(new RegExp("\\?",'g'), "%3F");
    title = title.replace(new RegExp("@",'g'), "%40");
    title = title.replace(new RegExp(" ",'g'), "+");
    // console.log("After Subs: " + title);
    return title;
  }
}
