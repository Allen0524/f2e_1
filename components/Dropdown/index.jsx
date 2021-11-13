import { useState, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import useClickOutside from "../../hooks/useClickOutside";

const Dropdown = ({ datas, defaultValue }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const ref = useRef();
  useClickOutside(ref, null, () => setShowMenu(false));

  function handleOnMenuClick(e) {
    if (e.target.id && e.target.id !== "") {
      setSelectedValue(e.target.id);
      setShowMenu((old) => !old);
    } else {
      setShowMenu((old) => !old);
    }
  }

  return (
    <div
      className="relative rounded-lg shadow-lg h-12 min-w-[200px] flex items-center justify-between cursor-pointer"
      onClick={handleOnMenuClick}
      ref={ref}
    >
      <div className="font-semibold text-sm pl-2">
        {selectedValue || defaultValue}
      </div>
      {showMenu ? (
        <ChevronUpIcon className=" h-5 pr-2" />
      ) : (
        <ChevronDownIcon className=" h-5 pr-2" />
      )}
      <div
        className="absolute top-16 rounded-lg shadow-lg w-full max-h-64 bg-white z-20 overflow-hidden overflow-y-auto scrollbar-hide opacity-0 pointer-events-none translate-y-[-10px] transition-all last:border-b-0"
        style={
          showMenu
            ? {
                opacity: 1,
                pointerEvents: "auto",
                transform: "translateY(0px)",
              }
            : null
        }
      >
        {datas.map((data) => (
          <div
            key={data.id}
            id={data.id}
            className="border-b-2 text-center py-3 text-sm font-semibold cursor-pointer hover:bg-gray-100"
          >
            {data.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
