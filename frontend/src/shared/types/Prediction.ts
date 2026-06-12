export type PredictionBlock = {
  title: string

  teamAValue: number
  teamBValue: number

  description: string
}

export type Prediction = {
  _id?: string

  id?: string

  slug: string

  competition: string

  homeTeam: string
  awayTeam: string

  homeLogo: string
  awayLogo: string

  date: string

  homeProbability: number
  drawProbability: number
  awayProbability: number

  blocks: PredictionBlock[]

  createdAt: string
}