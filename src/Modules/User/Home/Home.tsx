import HomeCarousel from "../../../shared_components/Sliders/HomeCarousel";
import LogoSliderBrands from "../../../shared_components/Sliders/InfiniteSlider";
import InfiniteSlide from "../../../shared_components/Sliders/InfiniteSlider";
import Categories from "../Categories/Categories";
// import Categories from "";
import Products from "../Products/Products";



export default function Home() {

  return (
    <>
      <HomeCarousel />
      <Categories />
      <LogoSliderBrands />
      <Products />
    </>
  );
}
