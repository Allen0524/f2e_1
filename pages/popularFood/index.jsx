import React from "react";
import Head from "next/head";
import Header from "../../components/Header/Header";
import SmallCard from "../../components/SmallCard/SmallCard";
import { BeakerIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";
import axios from "axios";
import { Pagination, usePagination } from "../../components/Pagination";
import { setPageListMax } from "../../components/Pagination/Pagination";
import { fetchNextPage } from "../../lib";
import { getAuthorizationHeader } from "../../api";

let persistentCurrentPage = null;
let persistentMaxPage = null;

const PopularFood = () => {
  const [max, setMax] = React.useState(persistentMaxPage || 18);
  const { currentPage, setCurrentPage, pageList, setPageList } = usePagination(
    max,
    persistentCurrentPage
  );
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      [`pagination`, currentPage],
      () => fetchNextPage(currentPage, "Restaurant"),
      {
        keepPreviousData: true,
      }
    );

  React.useEffect(() => {
    persistentCurrentPage = currentPage;
  }, [currentPage]);

  React.useEffect(() => {
    async function getMax() {
      const res = await axios.get(
        "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON",
        { headers: getAuthorizationHeader() }
      );
      const max = res.data.length;
      setMax(max);
      setPageList(setPageListMax(max));
      persistentMaxPage = max;
    }

    if (!persistentMaxPage) {
      getMax();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>熱門美食</title>
        <link rel="icon" href="/taiwan.png" />
      </Head>
      <Header subTitle="熱門美食" />
      <main className="max-w-7xl mx-auto px-8 sm:px-16 bg-slightBlue">
        <section className="pt-6 mb-10">
          <div className="relative flex justify-center items-center pb-5 text-pri">
            <h2 className="text-4xl font-semibold text-center pr-2">
              熱門美食
            </h2>
            <BeakerIcon className="h-8" />
          </div>
          <div className="grid grid-cols-1 gap-y-5 gap-x-8 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((data) => (
              <SmallCard
                key={data.ID}
                id={data.ID}
                address={data.Address}
                name={data.Name}
                picture={data.Picture.PictureUrl1}
                opentime={data.OpenTime}
                category="popularFood"
              />
            ))}
          </div>
        </section>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageList={pageList}
          max={18} // 總數／３
        />
      </main>
    </div>
  );
};

export default PopularFood;
