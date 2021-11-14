import { useState, useRef } from "react";
import Arrows from "./Arrows";
import Content from "./Content";
import Dots from "./Dots";

const Carosule = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevIndex = () => {
    setActiveIndex((pre) => (pre === 0 ? images.length - 1 : pre - 1));
  };

  const handleNextIndex = () => {
    setActiveIndex((pre) => (pre === images.length - 1 ? 0 : pre + 1));
  };

  const handleActiveIndexClick = (index) => {
    setActiveIndex((pre) => index);
  };
  return (
    <div className="relative w-full lg:w-[800px] h-[549px] overflow-hidden rounded-xl">
      <Content activeIndex={activeIndex} images={images} />
      <Arrows prevIndex={handlePrevIndex} nextIndex={handleNextIndex} />
      <Dots
        images={images}
        activeIndex={activeIndex}
        activeIndexClick={handleActiveIndexClick}
      />
    </div>
  );
};

export default Carosule;
