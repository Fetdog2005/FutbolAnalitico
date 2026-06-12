import { Link } from 'react-router-dom'
import './PredictionCard.css'

type PredictionCardProps = {
  slug: string
  competition: string
  homeTeam: string
  awayTeam: string
  date: string
  homeProbability: number
  drawProbability: number
  awayProbability: number
  homeLogo: string
  awayLogo: string
}

export default function PredictionCard({
  slug,
  competition,
  homeTeam,
  awayTeam,
  date,
  homeLogo,
  awayLogo,
  homeProbability,
  drawProbability,
  awayProbability

}: PredictionCardProps) {

  return (
    
    <article className="prediction-card">
        <Link
  to={`/categoria/${competition
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}`}
  className="prediction-card__competition"
>
  {competition}
</Link>
      <div className="prediction-card__header">
        <div className="team">
          <div className="team-logo">
  {homeLogo ? (
    <img
      src={homeLogo}
      alt={homeTeam}
    />
  ) : (
    homeTeam.charAt(0)
  )}
</div>
          <span>{homeTeam}</span>
        </div>

        <div className="match-date">
          <span>{date}</span>
        </div>

        <div className="team">
          <div className="team-logo">
  {awayLogo ? (
    <img
      src={awayLogo}
      alt={awayTeam}
    />
  ) : (
    awayTeam.charAt(0)
  )}
</div>
          <span>{awayTeam}</span>
        </div>
      </div>

      <div className="prediction-card__bar">
        <div
          className="home-bar"
          style={{ width: `${homeProbability}%` }}
        />

        <div
          className="draw-bar"
          style={{ width: `${drawProbability}%` }}
        />

        <div
          className="away-bar"
          style={{ width: `${awayProbability}%` }}
        />
      </div>

      <div className="prediction-card__percentages">
        <span>{homeProbability}%</span>
        <span>{drawProbability}%</span>
        <span>{awayProbability}%</span>
      </div>

      <Link
  to={`/predicciones/${slug}`}
  className="prediction-card__button"
>
  Ver análisis
</Link>
    </article>
  )
}