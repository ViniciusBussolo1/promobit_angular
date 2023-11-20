import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetFilmsService } from '../services/getFilms/get-filmes.service';
import { Cast, Crew, Films, FilmsById, Trailer } from '../types/films.interface';
import { DomSanitizer } from '@angular/platform-browser';

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
    poster_path: '',
    genres: [{
      id: 0,
      name: ''
    }],
    runtime: 0,
    vote_average: 0,
    vote_count: 0
  };
  trailer: Trailer = { name: '', key: '',}
  listRecommendations: Films[] = []
  cast: Cast[] = []
  crew: Crew[] = []

  constructor(private route: ActivatedRoute, private GetFilmsService: GetFilmsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id !== null && id !== '') {
        const idNumber = parseInt(id);
        this.getFilm(idNumber)
        this.getTrailer(idNumber)
        this.getRecommedations(idNumber)
        this.getCast(idNumber)
        this.getCrew(idNumber)
      }
    });


  }

  getFilm(id: number): void {
    this.GetFilmsService.getFilmById(id).subscribe(data =>
      {
        this.listFilms = data
      }
    )

  }

  getTrailer(id: number): void {
    this.GetFilmsService.getTrailer(id).subscribe(data =>
      {
        this.trailer = data
      }
    )
  }

  getRecommedations(id: number): void {
    this.GetFilmsService.getRecommendations(id).subscribe(data =>
      {
        this.listRecommendations = data

      }
    )
  }

  getSafeTrailerUrl(key: string) {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getCast(id: number): void {
    this.GetFilmsService.getCast(id).subscribe(data =>
      {
        this.cast = data
      }
    )
  }

  getCrew(id: number): void {
    this.GetFilmsService.getCrew(id).subscribe(data =>
      {
        const producerList = data.filter(
          (member) => member.job === 'Producer'
        );
        const limitedProducers = producerList.slice(0, 5);
        this.crew = limitedProducers
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
