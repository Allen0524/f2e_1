import { useState } from "react";
import { Nextbtn, PrevBtn, Pages } from "./index";

export function setPageListMax(maxLen = 18) {
  const arr = Array.from({ length: maxLen }, (v, k) => k);
  let a = [];
  for (let i = 0; i < maxLen; i += 3) {
    a.push(arr.slice(i, i + 3));
  }
  return a;
}

export function usePagination(maxLen, persisCurrentPage) {
  const [currentPage, setCurrentPage] = useState(persisCurrentPage || 1);
  const [pageList, setPageList] = useState(setPageListMax());

  return {
    currentPage,
    setCurrentPage,
    pageList,
    setPageList,
  };
}

const Pagination = ({ currentPage, setCurrentPage, pageList, max }) => {
  return (
    <div className="flex justify-center mb-16">
      <PrevBtn disable={currentPage === 1} setCurrentPage={setCurrentPage} />
      <Pages
        limit={3}
        max={15}
        pageList={pageList[Math.floor((currentPage - 1) / 3)]}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Nextbtn
        disable={currentPage === max}
        setCurrentPage={setCurrentPage}
        max={max}
      />
    </div>
  );
};

export default Pagination;
