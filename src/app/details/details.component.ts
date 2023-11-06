import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFilmsService } from '../services/getFilms/get-filmes.service';
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
    release_date: '',
    overview: '',
    genres: [{
      id: 0,
      name: ''
    }],
    runtime: 0,
    vote_average: 0,
    vote_count: 0
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

  convertMinutesInHours(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}min`;
  }

  calculatePercentage(media: number): string {
    const mediaeEmPorcentagem = (media / 10) * 100
    return mediaeEmPorcentagem.toFixed(0);
  }

}
