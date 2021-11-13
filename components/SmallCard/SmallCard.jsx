import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const SmallCard = ({ name = "", address, picture, opentime, category, id }) => {
  const imgRef = useRef();
  function onError() {
    imgRef.current.style.width = "80px";
    imgRef.current.style.height = "80px";
    imgRef.current.src = "/img-notFound.png";
  }
  return (
    <div className="flex flex-col rounded-xl shadow-2xl bg-white w-[260px] sm:w-[220px] md:w-[205px] lg:w-[210px] xl:w-[220px] 2xl:w-[260px]">
      <div className="relative flex justify-center items-center h-[145px] md:h-32 lg:h-36">
        <img
          ref={imgRef}
          className="rounded-t-xl w-full h-full"
          loading="lazy"
          src={picture || "/img-not-found.png"}
          alt="image"
          onError={onError}
        />
      </div>
      <div className="p-3 h-48 flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <LocationMarkerIcon className="w-4 h-5 text-red-600" />
            <h3 className="text-md font-semibold ml-1 truncate flex-1">
              {address}
            </h3>
          </div>
          <h3 className="text-sm font-semibold pt-1 max-h-[45px] overflow-hidden truncate">
            {name}
          </h3>
          <div className="text-xs text-gray-400 pt-1">
            <h5>開放時間</h5>
            <h5 className="h-[45px] overflow-hidden w-[180px]">{opentime}</h5>
          </div>
        </div>
        <div className="flex flex-col">
          <Link href={`${category}/${id}`} passHref>
            <button
              aria-label="View Details Button"
              className="w-full bg-pri text-white p-1 rounded-lg mt-1"
            >
              查看詳情
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
