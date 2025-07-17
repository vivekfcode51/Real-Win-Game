/* eslint-disable react/prop-types */
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const WingoPagination = ({
  currentPage,
  totalPages,
  hasMore,
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
}) => {
  // console.log("totalPagestotalPages",totalPages)
  return (
    <div className="pagination rounded-md flex bg-white py-4 items-center justify-center gap-10 mt-5 mb-5 mx-4">
      <button
        onClick={onPrevClick}
        className={`flex items-center justify-center font-semibold w-10 text-xsm py-1 rounded-lg ${prevDisabled?"bg-inputBg text-lightGray":"bg-red text-white"} `}
        disabled={prevDisabled}
      >
        <MdKeyboardArrowLeft className="font-extrabold text-3xl" />
      </button>
      <p className="text-lightGray text-[12.8px]">{currentPage}{totalPages}</p>
      <button
        onClick={onNextClick}
        className={`flex items-center justify-center font-semibold w-10 text-sm py-1 rounded-lg ${nextDisabled?"bg-inputBg text-lightGray":"bg-red text-white"}`}
        disabled={nextDisabled}
      >
        <MdKeyboardArrowRight className="font-extrabold text-3xl text-white" />
      </button>
    </div>
  );
};

export default WingoPagination;
