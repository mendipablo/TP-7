import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {query} from '../env';
import {Movie} from './movie';


@Injectable({
    providedIn: 'root'
})
export class MovieService{
    constructor(private http: HttpClient){
    }
        
        getMovie(): Observable<Movie[]> {
            return this.http.get<Movie[]>(`${API_URL}/movies`)
        }

        add(movie: Movie): Observable<any>{
            return this.http.post(`${API_URL}/add`, movie)
        }
        search(movie: string): Observable<Movie[]>{
            return this.http.get<Movie[]>(`${API_URL}/movies/search${query}${movie}`)
        }
        delete(movie: string): Observable<{}>{
            return this.http.get(`${API_URL}/delete?d=${movie}`)
        }

        update(movie: Movie, movieN : string): Observable<Movie>{
            return this.http.put<Movie>(`${API_URL}/update/${movie.title}/${movieN}`, movie)
        }

        
}