import Categories from "./categories/Categories"
import Hero from "./hero/Hero"
import Card from "./cards/Card"
import Reviews from "./Review"

const home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Card />
      <Reviews />
    </div>
  )
}

export default home