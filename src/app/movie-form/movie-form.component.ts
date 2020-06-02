import { Component, OnInit } from '@angular/core';
import {MovieComponent} from "../movie/movie.component";
import { FormControl } from '@angular/forms';
import {MessageService} from "../message.service";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  form = new FormControl('');

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(value: string){
    // console.log(value);
    // console.log("SUBMITTED");
    this.messageService.sendMessage("search",value)
  }

}
