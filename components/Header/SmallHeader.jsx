import Link from "next/link";

const SmallHeader = () => {
  return (
    <div className="flex items-center p-5">
      <Link href="/">
        <div className="flex mb-[25px] cursor-pointer items-center">
          <img src="/logo.png" alt="logo" className=" h-16" />
          <div className="ml-[6px] text-3xl tracking-wide">TaiFun旅遊網</div>
        </div>
      </Link>
    </div>
  );
};

export default SmallHeader;
