export type PredictionBlockItem = {
  label: string
  value: string
}

export type PredictionBlock = {
  title: string
  items: PredictionBlockItem[]
}

export type Prediction = {
  _id?: string
  id?: string

  slug: string

  competition: string
  competitionId?: string

  homeTeam: string
  awayTeam: string

  homeTeamId?: string
  awayTeamId?: string

  homeLogo: string
  awayLogo: string

  date: string

  homeProbability: number
  drawProbability: number
  awayProbability: number

  blocks: PredictionBlock[]

  createdAt: string
}