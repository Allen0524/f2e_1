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
