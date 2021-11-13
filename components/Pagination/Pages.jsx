const Page = ({ id, currentPage, setCurrentPage }) => {
  return (
    <div
      className={
        currentPage === id + 1
          ? "border-2 rounded-xl border-gray-300 p-1 mr-5 cursor-pointer bg-pri"
          : "border-2 rounded-xl border-gray-300 p-1 mr-5 cursor-pointer"
      }
      onClick={() => setCurrentPage(id + 1)}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        <div className={currentPage === id + 1 ? "text-white" : ""}>
          {id + 1}
        </div>
      </div>
    </div>
  );
};

const Pages = ({ pageList, currentPage, setCurrentPage }) => {
  return (
    <div className="flex justify-center items-center">
      {pageList.map((page) => (
        <Page
          key={page}
          id={page}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ))}
    </div>
  );
};

export default Pages;
