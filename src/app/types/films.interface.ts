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

