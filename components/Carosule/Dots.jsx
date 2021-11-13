const Dots = ({ images, activeIndex, activeIndexClick }) => {
  return (
    <div className="absolute w-full h-full flex top-[85%] justify-center z-30">
      {images?.map((slide, index) => {
        return (
          <span
            key={index}
            className=" cursor-pointer h-4 w-4 my-0 mx-1 bg-dotsDefault rounded-full inline-block"
            style={
              index === activeIndex
                ? { backgroundColor: "rgba(255, 255, 255, 0.5)" }
                : null
            }
            onClick={() => activeIndexClick(index)}
          ></span>
        );
      })}
    </div>
  );
};

export default Dots;
