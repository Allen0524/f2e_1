import React, { useState } from "react";
import Dropdown from "../Dropdown";
import { useRouter } from "next/dist/client/router";
import datas from "../../constant/location";
import CATEGORY_DATA from "../../constant/category";

function filterReducer(state, action) {
  switch (action.type) {
    case "分類":
      return {
        ...state,
        category: action.payload,
      };
    case "選擇縣市":
      return {
        ...state,
        citys: [...state.citys, action.payload],
      };
    case "reset":
      return { ...state, category: "", citys: [] };
    default:
      return state;
  }
}

const Filter = ({ setShowSuspension }) => {
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
    setShowSuspension(false);
  };

  return (
    <div>
      <div className="border-b-2">
        <div className="p-4 w-80">
          <div className="mb-2 px-1 font-semibold">分類</div>
          <Dropdown
            datas={CATEGORY_DATA}
            defaultValue="分類"
            dispatch={dispatch}
          />
        </div>
      </div>
      <div>
        <div className="p-4 grid grid-cols-3">
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
        </div>
        <div className="flex justify-center items-center">
          <button
            className="rounded-3xl bg-pri text-white text-lg p-2 w-40"
            onClick={search}
          >
            搜尋
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
