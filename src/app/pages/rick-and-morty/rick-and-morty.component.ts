import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Personaje, Personajes } from './interfaces/personajes';
import { RickAndMortyService } from './services/rick-and-morty.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-rick-and-morty',
  standalone: true,
  imports: [CardComponent,  PaginacionComponent, SearchComponent],
  templateUrl: './rick-and-morty.component.html',
  styleUrl: './rick-and-morty.component.css'
})
export class RickAndMortyComponent implements OnInit {
  personajes: Personajes | undefined;

  constructor(
     private _srvPersonaje:  RickAndMortyService
  ) { }

  ngOnInit(): void {
    this._srvPersonaje.getPersonajes().subscribe((personajesAll) =>{ 
        personajesAll.results.forEach((personaje) => {
          this._srvPersonaje.getpersonaje(personaje.id).subscribe((personajeData) => {
             personaje.data = personajeData;
             this._srvPersonaje.nextURL = personajesAll.info.next;
             this._srvPersonaje.previousURL = personajesAll.info.prev;
          });
        });
        this.personajes = personajesAll;
      }
    );
  }
  setNewPersonaje(personajesNews: Personajes):void{
    this.personajes = personajesNews;
  }

  searchPersonaje(termino: string): void {
    const esNumero = !isNaN(Number(termino));
  
    if (termino && esNumero) {
      this._srvPersonaje.getpersonaje(termino).subscribe((personaje) => {
        this.personajes = {
          info: {
            count: 1,
            pages: 1,
            next: '',
            prev: null
          },
          results: [
            {
              id: personaje.id,
              name: personaje.name,
              status: personaje.status,
              species: personaje.species,
              type: personaje.type,
              gender: personaje.gender,
              origin: personaje.origin,
              location: personaje.location,
              image: personaje.image,
              episode: personaje.episode,
              url: personaje.url,
              created: personaje.created,
              data: personaje
            }
          ]
        };
      }, error => {
        this.personajes = undefined;
      });
    } else if (termino && !esNumero) {
      this._srvPersonaje.getPersonajesByName(termino).subscribe((personajesAll) => {
        personajesAll.results.forEach((personaje) => {
          this._srvPersonaje.getpersonaje(personaje.id).subscribe((personajeData) => {
            personaje.data = personajeData;
          });
        });
  
        this._srvPersonaje.nextURL = personajesAll.info.next;
        this._srvPersonaje.previousURL = personajesAll.info.prev;
        this.personajes = personajesAll;
      }, error => {
        this.personajes = undefined;
      });
    } else {
      this.ngOnInit();
    }
  }
  


}
