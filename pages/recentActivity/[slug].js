import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import SmallLayout from "../../components/Layout/SmallLayout";
import { PhoneIcon, MapIcon, BeakerIcon } from "@heroicons/react/solid";
import axios from "axios";
import { getAuthorizationHeader } from "../../api";
import Carosule from "../../components/Carosule/Carosule";

function verify(obj) {
  const images = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key && key.includes("PictureUrl")) {
      images.push({ url: value, notFound: false });
    }
  }

  if (images.length === 0) {
    images.push({ url: "/not-found.png", notFound: true });
    return images;
  } else {
    return images;
  }
}

export default function PageInfo({ data }) {
  const Map = dynamic(() => import("../../components/Map"), { ssr: false });
  console.log(data);

  return (
    <>
      <Head>
        <title>{data.Name}</title>
        <link rel="icon" href="/taiwan.png" />
      </Head>
      <SmallLayout>
        <main className="max-w-7xl mx-auto px-8 sm:px-16">
          <h1 className="font-semibold text-2xl mb-3">{data.Name}</h1>
          <div className="border-2 inline-block p-2 bg-pri text-white mb-4">
            {data.Class || data.Class1 || data.Class2 || data.Class3}
          </div>
          <div className="flex h-[550px]">
            <Carosule images={verify(data?.Picture)} />
            <div className="w-[200px] md:w-[300px] ml-3">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg mb-4 whitespace-nowrap">
                  資訊
                </h3>
                <div className="flex flex-col mb-4">
                  <h3 className="font-semibold text-lg whitespace-nowrap">
                    電話：
                  </h3>
                  <div className="flex items-center">
                    <div>{data.Phone || "--"}</div>
                    {/* <div>圖</div> */}
                    <PhoneIcon className="h-9 bg-pri text-white p-2 rounded-md ml-6 cursor-pointer" />
                    {/* <LocalPhoneOutlinedIcon className="h-9 bg-pri text-white p-2 rounded-md ml-6" /> */}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-lg whitespace-nowrap">
                  地址：
                </h3>
                <div className="flex items-center">
                  <div>{data.Address}</div>
                  <MapIcon className="h-9 bg-pri text-white p-2 rounded-md ml-6 cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <div className="font-semibold text-lg whitespace-nowrap">
                  開放時間：
                </div>
                <div className="min-h-[55px]">{data.OpenTime || "--"}</div>
              </div>
            </div>
          </div>
          <section className="mb-8">
            <div>
              <h2 className="font-semibold text-lg mb-4 text-gray-700">介紹</h2>
              <p>{data.DescriptionDetail}</p>
            </div>
            <div>
              <h2 className="font-semibold text-lg mb-4">景點地圖</h2>
              <h5 className="text-gray-500">點擊以下按鈕搜尋</h5>
              <div className="flex items-center justify-evenly mb-6">
                <div className="flex flex-col items-center">
                  <BeakerIcon className="w-10 h-10 rounded-full bg-pri text-white p-2 cursor-pointer" />
                  <div>搜尋附近餐廳</div>
                </div>
                <div className="flex flex-col items-center">
                  <BeakerIcon className="w-10 h-10 rounded-full bg-pri text-white p-2 cursor-pointer" />
                  <div>搜尋附近餐廳</div>
                </div>
                <div className="flex flex-col items-center">
                  <BeakerIcon className="w-10 h-10 rounded-full bg-pri text-white p-2 cursor-pointer" />
                  <div>搜尋附近餐廳</div>
                </div>
              </div>
              <Map
                pos={data.Position.PositionLat}
                lon={data.Position.PositionLon}
              />
            </div>
          </section>
        </main>
      </SmallLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const res = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(ID, '${params.slug}')&$format=JSON`,
    { headers: getAuthorizationHeader() }
  );
  const data = await res.data[0];

  return {
    props: {
      data,
    },
  };
}
