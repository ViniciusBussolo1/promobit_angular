import { Component } from '@angular/core';
import { Films } from '../types/films.interface';
import { GetFilmsService } from '../services/getFilms/get-filmes.service';
import  { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';
import { Genres } from '../types/genres.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  imageLogo = '/assets/Logo.svg'

  listFilms$: Observable<Films[]> = new Observable<Films[]>()
  listFilmsGenre$: Observable<Films[]> = new Observable<Films[]>()
  listgenres: Genres[] = []
  totalPages: number = 0
  idGenre: number = 0

  currentPageFilms: number = 1;
  currentPageFilmsGenre: number = 1

  faChevronRight = faChevronRight
  faChevronLeft = faChevronLeft

  constructor(private GetFilmsService: GetFilmsService) {}

  ngOnInit(): void {
    this.getFilms()
    this.getTotalPages()
    this.getGenres()

  }

  getFilms(): void{
    this.listFilms$ = this.GetFilmsService.getFilms(this.currentPageFilms).pipe(
      map(response => {return response})
    )
  }

  getTotalPages(): void {
    this.GetFilmsService.getTotalPages().subscribe(data =>
      {
        this.totalPages = data
      }
    )
  }

  getGenres(): void {
    this.GetFilmsService.getFiltersGenres().subscribe(data =>
      {
        this.listgenres = data
      }
    )
  }

  getFilmsGenre(id: number) {
    this.idGenre = id
    this.listFilmsGenre$ = this.GetFilmsService.getFilmByGenre(id, this.currentPageFilmsGenre).pipe(
      map(response => {return response})
    )
  }

  nextPageFilms() {
    if (this.currentPageFilms < this.totalPages) {
      this.currentPageFilms++;
      this.getFilms();
    }
  }

  prevPageFilms() {
    if (this.currentPageFilms > 1) {
      this.currentPageFilms--;
      this.getFilms();
    }
  }

  nextPageFilmsGenre() {
    if (this.currentPageFilmsGenre < 14000) {
      this.currentPageFilmsGenre++;
      this.getFilmsGenre(this.idGenre);
    }
  }

  prevPageFilmsGenre() {
    if (this.currentPageFilmsGenre > 14000) {
      this.currentPageFilmsGenre--;
      this.getFilmsGenre(this.idGenre);
    }
  }

}
