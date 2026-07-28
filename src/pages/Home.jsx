import Hero from "../components/HomePage/Hero";
import Categories from '../components/HomePage/Categories'
import FeaturedCollection from "../components/HomePage/FeaturedCollection";
import Campaign from '../components/HomePage/Campaign'
import WhyChooseUs from "../components/HomePage/WhyChooseUs";
import InstagramGallery from "../components/HomePage/InstagramGallery";
import Newsletter from "../components/HomePage/Newsletter";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
         <FeaturedCollection />
         <Campaign/>
         <WhyChooseUs/>
         <InstagramGallery/>  
         <Newsletter/>
<Footer/>
    </div>
  );
}