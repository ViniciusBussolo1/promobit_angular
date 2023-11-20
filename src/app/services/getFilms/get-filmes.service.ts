import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Cast, Crew, Films, FilmsById, Trailer } from 'src/app/types/films.interface';
import { Genres } from 'src/app/types/genres.interface';

@Injectable({
  providedIn: 'root'
})
export class GetFilmsService {
  apiUrl = environment.apiUrl
  apiKey = environment.ACCESS_TOKEN

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    }
  };

  constructor(private http: HttpClient) { }

  getFilms(page: number): Observable<Films[]> {
    const url = `${this.apiUrl}/movie/popular?language=pt-BR&page=${page}`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.results)
    )
  }

  getFiltersGenres(): Observable<Genres[]> {
    const url = `${this.apiUrl}/genre/movie/list?language=pt-BR`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.genres)
    )
  }

  getTotalPages(): Observable<number> {
    const url = `${this.apiUrl}/movie/popular?language=pt-BR`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.total_pages)
    )
  }

  getFilmByGenre(id?: number, page?:number): Observable<Films[]> {
    const url = `${this.apiUrl}/discover/movie?language=pt-BR&with_genres=${id}&page=${page}`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.results)
    )
  }

  getFilmById(id: number): Observable<FilmsById> {
    const url = `${this.apiUrl}/movie/${id}?language=pt-BR`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response)
    )
  }

  getTrailer(id: number): Observable<Trailer> {
    const url = `${this.apiUrl}/movie/${id}/videos?language=pt-BR`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.results[0])
    )
  }

  getRecommendations(id: number): Observable<Films[]> {
    const url = `${this.apiUrl}/movie/${id}/recommendations?language=pt-BR&page=1`;
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.results)
    )
  }

  getCast(id: number): Observable<Cast[]> {
    const url = `${this.apiUrl}/movie/${id}/credits?language=pt-BR`
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.cast)
    )
  }

  getCrew(id: number): Observable<Crew[]> {
    const url = `${this.apiUrl}/movie/${id}/credits?language=pt-BR`
    return this.http.get(url, this.options).pipe(
      map((response: any) => response.crew)
    )
  }

}
