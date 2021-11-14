import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { useRouter } from "next/dist/client/router";
import datas from "../../constant/location";
import CATEGORY_DATA from "../../constant/category";

function filterReducer(state, action) {
  switch (action.type) {
    case "分類":
      return { ...state, category: action.payload };
    case "選擇縣市":
      return { ...state, citys: [...state.citys, action.payload] };
    case "reset":
      return { ...state, category: "", citys: [] };
    default:
      return state;
  }
}

const SmallFilter = ({ setShowFilter }) => {
  const router = useRouter();
  const [state, dispatch] = React.useReducer(filterReducer, {
    category: "",
    citys: [],
  });

  const { category, citys } = state;

  const search = () => {
    if (category === "") {
      alert("請選擇分類");
      return;
    }
    if (citys.length === 0) {
      router.push({
        pathname: `/popular${category}`,
      });
    } else {
      router.push({
        pathname: "/search",
        query: {
          category,
          citys,
        },
      });
    }
    setShowFilter(false);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-full mt-5">
      <div className="flex flex-col items-start mb-5">
        <div className="mb-2 px-1">分類</div>
        <Dropdown
          datas={CATEGORY_DATA}
          defaultValue="分類"
          dispatch={dispatch}
        />
      </div>

      {datas.map((data) => (
        <div key={data.id} className="flex flex-col items-start mb-5">
          <div className="mb-2 px-1">{data.id}</div>
          <Dropdown
            datas={data.datas}
            defaultValue="選擇縣市"
            dispatch={dispatch}
          />
        </div>
      ))}
      <button
        className="bg-pri rounded-3xl p-3 w-32 text-white"
        onClick={search}
      >
        搜尋
      </button>
    </div>
  );
};

export default SmallFilter;
