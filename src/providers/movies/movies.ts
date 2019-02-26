import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

/*
  Generated class for the MoviesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoviesProvider {
  apiUrl: string = "http://www.omdbapi.com/?";
  apiKey: string = "feb8bd81";
  movies = [];

  constructor(public http: HttpClient) {}

  loadMovies(search: string) {
    if (!search) search = "";
    this.movies = [];

    // Recherche tous les films correspondants à la recherche.
    this.http.get<Object>(this.apiUrl + "apikey=" + this.apiKey + "&s=" + search)

      .subscribe(data => {

        if (data['Search']) {
          for (let result of data['Search']) {
            // Récupère les informations relatives à chaque film du résultat précédent
            this.http.get<Object>(this.apiUrl + "apikey=" + this.apiKey + "&i=" + result['imdbID'])

              .subscribe(data => {
                this.movies.push(data);
              }, error => {
                console.log("Can't read movie of id: " + result['Search']['imdbID'], error);
              });
          }
        }

      }, error => {
        console.log("Request doesn't work :/", error);
      });

    console.log(this.movies);
  }

  getMovie(movieId: string) {
    return this.movies.find(function (m) {
      return m.imdbID === movieId;
    });
  }
}
