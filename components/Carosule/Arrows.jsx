const Arrows = ({ prevIndex, nextIndex }) => {
  return (
    <div>
      <span
        className="cursor-pointer z-30 absolute top-1/2 w-auto p-4 -mt-12 text-3xl font-bold rounded-r-[5px] rounded-b-[5px] hover:text-white hover:bg-arrowhover hover:transition hover:duration-500 hover:ease-in"
        onClick={prevIndex}
      >
        &#10094;
      </span>
      <span
        className="cursor-pointer right-0 z-30 absolute top-1/2 w-auto p-4 -mt-12 text-3xl font-bold rounded-t-[5px] rounded-l-[5px] hover:text-white hover:bg-arrowhover hover:transition hover:duration-500 hover:ease-in"
        onClick={nextIndex}
      >
        &#10095;
      </span>
    </div>
  );
};

export default Arrows;
