import { getAuthorizationHeader } from "../api";
import axios from "axios";

export async function fetchNextPage(page, category) {
  const res = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$top=${12}&$skip=${
      12 * (page - 1)
    }&$format=JSON`,
    {
      headers: getAuthorizationHeader(),
    }
  );
  const datas = await res.data;
  return datas;
}

function combineUrl(citys) {
  let filterCityStr = "";
  if (typeof citys === "string") {
    filterCityStr += `City eq '${citys}'`;
  } else {
    citys.map((city, idx) => {
      if (idx !== citys.length - 1) {
        filterCityStr += `City eq '${city}' or `;
      } else {
        filterCityStr += `City eq '${city}'`;
      }
    });
  }

  return filterCityStr;
}

export async function fetchNextPageWithFilter(page, category, citys) {
  const combineFilter = combineUrl(citys);
  const res = await axios.get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}?$filter=${combineFilter}&$top=${12}&$skip=${
      12 * (page - 1)
    }&$format=JSON`,
    {
      headers: getAuthorizationHeader(),
    }
  );
  const datas = await res.data;
  return datas;
}
