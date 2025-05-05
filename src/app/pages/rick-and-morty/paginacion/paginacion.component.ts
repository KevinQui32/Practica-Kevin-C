import { Component, EventEmitter, Output } from '@angular/core';
import { RickAndMortyService } from '../services/rick-and-morty.service';
import { NgClass } from '@angular/common';
import { Personajes } from '../interfaces/personajes';

@Component({
  selector: 'rick-and-morty-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewPersonajes = new EventEmitter<Personajes>();
  constructor( 
    private _srvPersonaje: RickAndMortyService
  ){ }
    
  get nextURL():string | null{
    return this._srvPersonaje.nextURL;
  }

  get previousURL():string | null{
    return this._srvPersonaje.previousURL;
  }
  
  loadPersonajes(url:string){
    this._srvPersonaje.getPersonajes(url).subscribe((personajesAll) =>{ 
      personajesAll.results.forEach((personaje) => {
        this._srvPersonaje.getpersonaje(personaje.id).subscribe((personajeData) => {
           personaje.data = personajeData;
           this._srvPersonaje.nextURL = personajesAll.info.next;
           this._srvPersonaje.previousURL = personajesAll.info.prev;
           this.eventNewPersonajes.emit(personajesAll);
        });
      });
  });
}

}
