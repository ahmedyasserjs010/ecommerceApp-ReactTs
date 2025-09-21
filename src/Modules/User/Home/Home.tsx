import HomeCarousel from "../../../shared_components/Sliders/HomeCarousel";
import HomeMainSlider from "../../../shared_components/test_components/HomeMainSlider";
import LogoSliderBrands from "../../../shared_components/Sliders/InfiniteSlider";
import InfiniteSlide from "../../../shared_components/Sliders/InfiniteSlider";
import Categories from "../Categories/Categories";
// import Categories from "";
import Products from "../Products/Products";
import Offers from "../../../shared_components/test_components/Offers";
import Hero from "../../../shared_components/test_components/Screens";
import Screens from "../../../shared_components/test_components/Screens";
import Kitchen from "../../../shared_components/test_components/Kitchen";
import Dishes from "../../../shared_components/test_components/Dishes";



export default function HomeMain() {

  return (
    <>
      
      <HomeCarousel />
      <Categories />

      <Products />


      <LogoSliderBrands />
    </>
  );
}
