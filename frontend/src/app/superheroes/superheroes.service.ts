import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {API_URL} from '../env';
import {query} from '../env';
import {SuperHeroe} from './superheroes';

@Injectable({
    providedIn: 'root'
})
export class HeroeService{
    constructor(private http: HttpClient){
    }

    getHeroes(): Observable<SuperHeroe[]> {
        return this.http.get<SuperHeroe[]>(`${API_URL}/get`)
    }

    addHeroe(heroe: SuperHeroe): Observable<any>{
        return this.http.post(`${API_URL}/addH`, heroe)
    }
    delete(heroe: string): Observable<{}>{
        return this.http.get(`${API_URL}/del?h=${heroe}`)
    }
    update(heroe: SuperHeroe, heroeN: string): Observable<SuperHeroe>{
        return this.http.put<SuperHeroe>(`${API_URL}/updateH/${heroe.nombre}/${heroeN}`, heroe)
    }
    searchH(heroe: string): Observable<SuperHeroe[]>{
        return this.http.get<SuperHeroe[]>(`${API_URL}/heroe/search${query}${heroe}`)
    }

}