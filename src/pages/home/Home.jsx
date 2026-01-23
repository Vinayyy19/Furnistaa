import { useEffect, useState } from "react";
import Categories from "./categories/Categories";
import Hero from "./hero/Hero";
import Card from "./cards/Card";
import Reviews from "./Review";
import WhyChoiceUs from "./WhyChoiceUs";
import FAQ from "./FAQ";
import MainLoader from "../../Loading/MainLoader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 700);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {showLoader && <MainLoader isVisible={loading} />}

      <div className={`${loading ? "hidden" : "block"}`}>
        <Hero />
        <WhyChoiceUs />
        <Categories setLoading={setLoading} />
        <Card />
        <Reviews />
        <FAQ />
      </div>
    </>
  );
};

export default Home;
