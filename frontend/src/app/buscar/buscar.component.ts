import { Component, OnInit } from '@angular/core';
import { Movie } from '../movies/movie';
import {AuthService} from '../services/auth.service';
import {MovieService} from '../movies/movie.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
  providers: [MovieService]
})
export class BuscarComponent implements OnInit {
  movies: Movie[]
  Moviesearch: string
  smovies: Movie[]
  Movieedit: Movie
  MovieToedit: string

  constructor(private auth: AuthService , private movieService: MovieService) {
    auth.handleAuthentication();

   }

  ngOnInit() {
    this.getMovie()
  
  }

  getMovie (): void {
    this.movieService.getMovie().subscribe(movies => (this.movies = movies))
    
}

  searchMovie (){
    if(this.Moviesearch== '' || (this.Moviesearch== undefined)){
      return this.getMovie()
    }
    else{
      this.movieService.search(this.Moviesearch).subscribe(smovies => (this.smovies = smovies))
      console.log(this.smovies)
    }
    this.Moviesearch= undefined
    this.movies.length = 0
}

  deleteMovie(movie: Movie){
    this.movies = this.movies.filter(h => h !== movie)
    this.movieService
      .delete(movie.title)
      .subscribe(()=> console.log('Pelicula Eliminada'))

}
  addMovie(movie: Movie) {
    this.movies = this.movies.filter(h => h !== movie)
    const film = new Movie(movie.title, movie.synopsis,movie.release_date, movie.poster)
    this.movieService
      .add(film)
      .subscribe(() => console.log('Pelicula Agregada'))
  }

  edit(movie){
    if (this.auth.isAuthenticated()) {
      this.Movieedit = movie
    }
  }
  now(movie){
    if (this.auth.isAuthenticated()) {
      this.MovieToedit= movie
    }
  }

  updateMovie(){
    if (this.auth.isAuthenticated()) {
      if(this.Movieedit){
        this.movieService.update(this.Movieedit, this.MovieToedit).subscribe(()=>{
          this.getMovie()
        })
        this.Movieedit = undefined
        this.MovieToedit = undefined
      }
  }
  }

}