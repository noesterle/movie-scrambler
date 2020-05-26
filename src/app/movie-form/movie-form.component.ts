import { Component, OnInit } from '@angular/core';
import {MovieComponent} from "../movie/movie.component";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  constructor(private movieComponent: MovieComponent) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("SUBMITTED");
    this.movieComponent.searchForMovie("Fast+Five");
  }

}
