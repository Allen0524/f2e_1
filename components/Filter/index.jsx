import Dropdown from "../Dropdown";
import datas from "../../constant/location";
import CATEGORY_DATA from "../../constant/category";

const Filter = () => {
  return (
    <div>
      <div className="border-b-2">
        <div className="p-4 w-80">
          <div className="mb-2 px-1 font-semibold">分類</div>
          <Dropdown datas={CATEGORY_DATA} defaultValue="分類" />
        </div>
      </div>
      <div>
        <div className="p-4 grid grid-cols-3">
          {datas.map((data) => (
            <div key={data.id} className="flex flex-col items-start mb-5">
              <div className="mb-2 px-1">{data.id}</div>
              <Dropdown datas={data.datas} defaultValue="選擇縣市" />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button className="rounded-3xl bg-pri text-white text-lg p-2 w-40">
            搜尋
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
