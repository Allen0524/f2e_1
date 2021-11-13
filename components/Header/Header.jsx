import React, { memo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon, AdjustmentsIcon } from "@heroicons/react/solid";
import useClickOutside from "../../hooks/useClickOutside";
import useMedia from "../../hooks/useMedia";
import Dropdown from "../Dropdown";
import Filter from "../Filter";
import datas from "../../constant/location";
import CATEGORY_DATA from "../../constant/category";

const Header = memo(({ subTitle = "景點、美食、活動" }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSuspension, setShowSuspension] = useState(false);
  const backDropRef = useRef();
  const filterRef = useRef();
  const buttonRef = useRef();
  useClickOutside(backDropRef, null, () => setShowFilter(false));
  useClickOutside(filterRef, buttonRef, () => setShowSuspension(false));
  const match = useMedia("(min-width: 1024px)");
  function handleOnFilter(e) {
    if (match) {
      setShowSuspension(true);
    } else {
      setShowFilter((old) => !old);
    }
  }

  // 避免打開suspension後又resize，導致畫面拉大後suspension還在
  React.useEffect(() => {
    if (!match && showSuspension) {
      setShowSuspension(false);
      setShowFilter(true);
    }
  }, [match, showSuspension]);

  //避免原本在小畫面，拉大畫面後還保持小畫面filter頁面
  React.useEffect(() => {
    if (match && showFilter) {
      setShowSuspension(true);
      setShowFilter(false);
    }
  }, [match, setShowFilter]);

  return (
    <>
      <div className="relative h-[311px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        <Image layout="fill" objectFit="cover" src="/banner.png" />
        <div className="absolute top-[10px] left-[27px] right-[27px] flex flex-col text-white md:top-[60px] xl:top-[80px] 2xl:top-[100px]">
          <Link href="/">
            <div className="flex mb-[25px] cursor-pointer items-center">
              <img src="/logo.png" alt="logo" className=" h-16" />
              <div className="ml-[6px] text-3xl tracking-wide">
                TaiFun旅遊網
              </div>
            </div>
          </Link>
          <div className="flex flex-col items-center mb-7">
            <h3 className="text-4xl font-semibold">尋找台灣</h3>
            <h4 className="text-3xl font-semibold pt-4">{subTitle}</h4>
          </div>

          <div className="flex flex-col w-full items-center">
            <div className="flex flex-col w-full min-w-[311px] max-w-[900px]">
              <div className="relative flex items-center justify-between">
                <div className="flex flex-grow items-center justify-between py-2 rounded-full border-2 shadow-sm">
                  <input
                    className="h-[42px] flex-grow pl-5 bg-transparent outline-none text-sm text-black placeholder-gray-400"
                    type="text"
                    placeholder="請輸入關鍵字"
                  />
                  <SearchIcon className="w-[42px] h-[42px] mx-3 p-2 cursor-pointer" />
                </div>
                <button
                  ref={buttonRef}
                  aria-label="filter button"
                  className="ml-2 rounded-lg w-[42px] h-[42px] bg-pri p-1 lg:flex lg:w-36 lg:h-16 lg:p-2 justify-center items-center lg:rounded-xl"
                  onClick={handleOnFilter}
                >
                  <AdjustmentsIcon className="h-full" />
                  <div className="hidden lg:inline-block pl-3">篩選</div>
                </button>
                {showSuspension && match ? (
                  <>
                    <div
                      className="absolute top-[70px] right-[25px] z-10 border-t-0 border-r-[40px] border-b-[40px] border-l-[40px]"
                      style={{
                        borderColor: "transparent transparent #fff transparent",
                      }}
                    />
                    <div
                      ref={filterRef}
                      className="absolute top-[90px] right-0 z-10 w-[700px] h-[400px] shadow-lg bg-gray-100 rounded-xl text-black opacity-0 transition-all"
                      style={showSuspension ? { opacity: 1 } : null}
                    >
                      <Filter />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="flex w-full justify-end h-[42px] mt-1 lg:opacity-0">
                <span className="">篩選</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <button
                aria-label="search button"
                className="w-[219px] h-[68px] rounded-3xl bg-pri text-xl"
              >
                搜尋
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          showFilter
            ? "fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-20 translate-y-0 transition-transform"
            : "fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-20 translate-y-full transition-transform"
        }
      >
        <div className="absolute top-[8%] w-full z-20 flex justify-center">
          <div className="h-1 w-20 bg-white rounded-sm" />
        </div>
        <div
          ref={backDropRef}
          className="absolute bottom-0 left-0 right-0 h-[90%] z-20 bg-gray-100 rounded-xl"
        >
          <div className="flex flex-col justify-start items-center w-full h-full mt-5">
            <div className="flex flex-col items-start mb-5">
              <div className="mb-2 px-1">分類</div>
              <Dropdown datas={CATEGORY_DATA} defaultValue="分類" />
            </div>

            {datas.map((data) => (
              <div key={data.id} className="flex flex-col items-start mb-5">
                <div className="mb-2 px-1">{data.id}</div>
                <Dropdown datas={data.datas} defaultValue="選擇縣市" />
              </div>
            ))}
            <button className="bg-pri rounded-3xl p-3 w-32 text-white">
              搜尋
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Header;
