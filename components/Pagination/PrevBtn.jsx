import { ChevronLeftIcon } from "@heroicons/react/solid";

const PrevBtn = ({ disable, setCurrentPage }) => {
  return (
    <button
      aria-label="Previous Page Button"
      className="border-2 rounded-xl border-gray-300 p-1 mr-5"
      onClick={() => setCurrentPage((old) => (old - 1 < 1 ? old : old - 1))}
    >
      <ChevronLeftIcon
        className={disable ? "w-10 h-10 text-gray-400" : "w-10 h-10"}
      />
    </button>
  );
};

export default PrevBtn;
