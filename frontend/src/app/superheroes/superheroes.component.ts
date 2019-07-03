import { Component, OnInit } from '@angular/core'
import { SuperHeroe } from './superheroes'
import { HeroeService} from './superheroes.service'
import { HttpClient } from '@angular/common/http'

@Component({
    selector: 'app-heroes',
    templateUrl: './superheroes.component.html',
    providers: [HeroeService]
})

export class HeroesComponent implements OnInit {
    
   
    constructor(private heroeService: HeroeService, private http: HttpClient) { }

    ngOnInit () {
        
    }

   
    
}