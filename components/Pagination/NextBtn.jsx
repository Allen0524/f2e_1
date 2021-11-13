import { ChevronRightIcon } from "@heroicons/react/solid";

const Nextbtn = ({ disable, setCurrentPage, max }) => {
  return (
    <button
      aria-label="Next Page Button"
      className="border-2 rounded-xl border-gray-300 p-1 mr-5"
      onClick={() => setCurrentPage((old) => (old + 1 > max ? old : old + 1))}
    >
      <ChevronRightIcon
        className={disable ? "w-10 h-10 text-gray-400" : "w-10 h-10"}
      />
    </button>
  );
};

export default Nextbtn;
