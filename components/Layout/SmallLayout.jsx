import SmallHeader from "../Header/SmallHeader";

const SmallLayout = ({ children }) => {
  return (
    <>
      <SmallHeader />
      {children}
    </>
  );
};

export default SmallLayout;
