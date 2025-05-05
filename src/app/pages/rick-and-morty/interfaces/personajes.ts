export interface Personajes {
    info: Info;
    results: Result[];
  }
  
  export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  }
  
  export interface Result {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
    data: Personaje;
  }
  
  export interface Personaje {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: Date;
  }
  
  export interface Location {
    name: string;
    url: string;
  }
  