import Categories from "./categories/Categories"
import Hero from "./hero/Hero"
import Card from "./cards/Card"
import Reviews from "./Review"
import WhyChoiceUs from "./WhyChoiceUs"

const home = () => {
  return (
    <div>
      <Hero />
      <WhyChoiceUs />
      <Categories />
      <Card />
      <Reviews />
    </div>
  )
}

export default home