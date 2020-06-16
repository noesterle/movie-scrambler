import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-scrambler';
  titlecase = 'movie scrambler'
  description = "Search for a movie in the Open Movie Database (OMDb) and see what the plot looks like when made up " +
    "of syllables from WordsAPI."
}
