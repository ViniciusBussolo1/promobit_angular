import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFilmsService } from '../services/getFilms/get-filmes.service';
import { Observable, map } from 'rxjs';
import { Films, FilmsById } from '../types/films.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  imageLogo = '/assets/Logo.svg'
  imageCapa = '/assets/imageCapa.svg'
  Avaliacao = '/assets/Avaliacao.svg'
  Swiper = '/assets/imageSwiperTeste.svg'
  SwiperTeste = '/assets/swiperteste.svg'

  listFilms: FilmsById = {
    id: 0,
    title: '',
  };

  constructor(private route: ActivatedRoute, private GetFilmsService: GetFilmsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id !== null && id !== '') {
        const idNumber = parseInt(id);
        this.getFilm(idNumber)
      }
    });
  }

  getFilm(id: number): void {
    this.GetFilmsService.getFilmById(id).subscribe(data =>
      {
        this.listFilms = data
        console.log(this.listFilms)
      }
    )

  }

}
