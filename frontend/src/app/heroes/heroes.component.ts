import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../superheroes/superheroes.service';
import { SuperHeroe } from '../superheroes/superheroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroeService]
})
export class HeroesComponent implements OnInit {
  heroes: SuperHeroe[]
  heroeEdit: SuperHeroe
  heroeToedit: string
  heroeSearch: string
  hero: SuperHeroe[]
  nombre: string
  ap: string
  bio: string
  img: string
  pelis:[]


  constructor(private heroeService: HeroeService) { }

  
  ngOnInit () {
    this.get()
}

get(): void{
    this.heroeService.getHeroes().subscribe(heroes => (this.heroes = heroes))
}

add() {
  const h = new SuperHeroe(this.nombre,this.bio,this.ap,this.img,this.pelis)
  this.heroeService
    .addHeroe(h)
    .subscribe(() => console.log('Heroe Agregado'))
    this.nombre= undefined
    this.bio= undefined
    this.ap= undefined
    this.img= undefined
    this.pelis= undefined
}

delete(heroe: SuperHeroe){
  this.heroes = this.heroes.filter(h => h !== heroe)
  this.heroeService
    .delete(heroe.nombre)
    .subscribe(()=> console.log('Heroe Eliminado'))

}

edit(heroe){
    this.heroeEdit = heroe
}

now(heroe){
  
    this.heroeToedit= heroe
}

updateHeroe(){
  if(this.heroeEdit){
    this.heroeService.update(this.heroeEdit, this.heroeToedit).subscribe(()=>{
      this.get()
    })
    this.heroeEdit = undefined
    this.heroeToedit = undefined
  }

}

searchHeroe(){
  if(this.heroeSearch== '' || (this.heroeSearch== undefined)){
    return this.get()
    
  }
  else{
    this.heroeService.searchH(this.heroeSearch).subscribe(heroes => (this.heroes = heroes))
    console.log(this.heroes)
  }
  this.heroeSearch= undefined
  this.heroes.length = 0
  
}


public toggle(element: HTMLElement){
  element.classList.toggle('d-none');
}



}
