import HeroNews from '../../../features/home/Hero/HeroNews'
import PredictionSection from '../../../features/home/Prediction/PredictionSection'
import FeaturedNewsSection from '../../../features/home/Featured/FeaturedNewsSection'
import Sobrenosotros from '../../../features/home/Sobrenosotros/Sobrenosotros'


export default function HomePage() {
  return (
    <>
      <main>
        <HeroNews />
        <PredictionSection />
        <FeaturedNewsSection />
        <Sobrenosotros />
      </main>


    </>
  )
}