import Categories from "./categories/Categories"
import Hero from "./hero/Hero"
import Card from "./cards/Card"
import Reviews from "./Review"
import WhyChoiceUs from "./WhyChoiceUs"
import FAQ from "./FAQ"

const home = () => {
  return (
    <div>
      <Hero />
      <WhyChoiceUs />
      <Categories />
      <Card />
      <Reviews />
      <FAQ />
    </div>
  )
}

export default home