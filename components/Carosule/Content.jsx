import { useRef } from "react";

const Content = ({ images, activeIndex }) => {
  const imgRef = useRef();
  function onError() {
    imgRef.current.src = "/not-found.png";
  }
  return (
    <section>
      {images?.map((obj, index) => {
        return (
          <div
            key={index}
            className=" relative w-[800px] h-[549px] rounded-xl"
            style={
              obj.notFound
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : index === activeIndex
                ? { display: "inline-block" }
                : { display: "none" }
            }
          >
            <img
              ref={imgRef}
              src={obj.url}
              alt=""
              className="absolute w-full h-full object-cover"
              style={
                obj.notFound
                  ? { objectFit: "contain", width: "200px", height: "200px" }
                  : null
              }
              onError={onError}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Content;
