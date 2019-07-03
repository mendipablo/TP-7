import { Component, OnInit } from '@angular/core'
import { Movie } from './movie'
import { MovieService } from './movie.service'
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    providers: [MovieService]
})

export class MovieComponent implements OnInit {
    movies: Movie[]
    editMovie: Movie
    

    constructor(private movieService: MovieService, private http: HttpClient) { }

    ngOnInit () {
        this.getMovie()
    }

    getMovie (): void {
        this.movieService.getMovie().subscribe(movies => (this.movies = movies))
    
    }
   
  
}