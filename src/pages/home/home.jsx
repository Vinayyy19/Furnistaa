import Categories from "./categories/Categories"
import Hero from "./hero/Hero"
import Card from "./cards/Card"

const home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Card />
    </div>
  )
}

export default home