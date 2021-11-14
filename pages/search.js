import React from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import { FireIcon } from "@heroicons/react/solid";
import axios from "axios";

import Header from "../components/Header/Header";
import SmallCard from "../components/SmallCard/SmallCard";
import { Pagination, usePagination } from "../components/Pagination";
import { setPageListMax } from "../components/Pagination/Pagination";
import { fetchNextPageWithFilter } from "../lib";
import { getAuthorizationHeader } from "../api";
import CATEGORY_DATA from "../constant/category";

let persistentCurrentPage = null;
let persistentMaxPage = null;

const Search = () => {
  const router = useRouter();
  const { category, citys } = router.query;
  const [max, setMax] = React.useState(persistentMaxPage || 18);
  const { currentPage, setCurrentPage, pageList, setPageList } = usePagination(
    max,
    persistentCurrentPage
  );

  const transformCategory = CATEGORY_DATA.find(
    (data) => data.value === category
  );

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(
      [
        `pagination ${currentPage}${category}${
          typeof citys !== "string" ? citys?.join() : citys
        }`,
        currentPage,
      ],
      () => fetchNextPageWithFilter(currentPage, category, citys),
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
        "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON",
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
      <Header subTitle={transformCategory.id} mainTitle={citys} />
      <main className="max-w-7xl mx-auto px-8 sm:px-16 bg-slightBlue">
        <section className="pt-6 mb-10">
          <div className="relative flex justify-center items-center pb-5 text-pri">
            <h2 className="text-4xl font-semibold text-center pr-2">
              {transformCategory.id}
            </h2>
            <FireIcon className="h-8" />
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
                category={`popular${category}`}
              />
            ))}
          </div>
        </section>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageList={pageList}
          max={max} // 總數／３
        />
      </main>
    </div>
  );
};

export default Search;
