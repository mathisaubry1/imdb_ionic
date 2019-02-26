import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MoviesProvider} from "../../providers/movies/movies";
import {MoviePage} from "../movie/movie";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public moviesProvider: MoviesProvider) {

  }

  goto(movieId: string) {
    const animationsOptions = {
      animation: 'md-transition',
      duration: 1000
    }
    this.navCtrl.push(
      MoviePage,
      { selectedMovie: this.moviesProvider.getMovie(movieId) },
      animationsOptions
    )
  }
}
