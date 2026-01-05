import image from "../../images/homeimage.jpg"
import Header from "../Header";
import HomePageDesktop from "../Homepage/HomePageDesktop/HomePageDesktop";
import HomePageMobile from "./HomepageMobile";
import TextSection from "./HomePageDesktop/ImageSection/TextSection";
import ImageSectionDesktop from "./HomePageDesktop/ImageSection/ImageSectionDesktop";
import ImageSectionMobile from "./HomePageDesktop/ImageSection/ImageSectionMobile"
import Cards from "../Homepage/Cards/Cards";
import Shop from "../Homepage/Category/Shop";
function Homepage() {
  return (
    <>
      <div 
        className="relative w-full h-[100dvh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <Header />
        {/* Desktop view */}

<HomePageDesktop/>


        {/* Mobile view */}
       <HomePageMobile/>


      </div>
<div>
<TextSection/>
<ImageSectionDesktop/>
<ImageSectionMobile/>
</div>

<Cards/>
<Shop/>

    </>
  );
}

export default Homepage;