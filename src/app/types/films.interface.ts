export interface Films {
  id: number
  title: string
  poster_path: string
  release_date: string
  total_pages: number
}

export interface FilmsById {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string
  genres: [
    {
      id: number
      name: string
    }
  ],
  runtime: number
  vote_average: number
  vote_count: number
}

export interface Trailer {
  name: string
  key: string
}

