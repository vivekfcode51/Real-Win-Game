// import popuplarbg1 from '../assets/category/popuplarbg1.png';
// import aviator from '../assets/category/aviator.png';
// import plinkpo from '../assets/category/plinkpo.png';
// import limbo from '../assets/category/limbo.png';
// import aviator2 from '../assets/category/aviator2.png';
// import plinko from '../assets/category/plinko.png';
// import mines from '../assets/category/mines.png';
// import fortune from '../assets/category/fortune.png';
// import royalfishing from '../assets/category/royalfishing.png';
// import superrich from '../assets/category/superrich.png';
// import fortunerabbit from '../assets/category/fortunerabbit.png';
// import deco_first from "../assets/images/deco_first.png";
// import deco_second from "../assets/images/deco_second.png";
// import deco_third from "../assets/images/deco_third.png";
// import deco_four from "../assets/images/deco_four.png";
import { fetchAllGames, fetchGameURL } from "../reusable_component/gameApi";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import viewall from "../assets/usaAsset/homeScreen/viewall.png"
import { useNavigate } from "react-router-dom";
import Loader from "../reusable_component/Loader/Loader";
function PopularGamesList() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId")
  // console.log("userId", userId)
  const [allGamesListView, setAllGamesListView] = useState(null)
  useEffect(() => {
    fetchAllGames(setAllGamesListView);
  }, []);
  // console.log("allGamesListView",allGamesListView)
  return (
    <>
      {/* {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="grid grid-cols-3 w-full">
        {allGamesListView?.data?.popular?.length > 0 ? (
          allGamesListView?.data?.popular?.map((item, i) => (
            <div onClick={() => fetchGameURL(item?.id, userId, navigate, setLoading)} key={i} className=" flex flex-col items-center text-black p-2 ">
              <img src={item?.img} className="w-36 h-24 rounded-lg" alt="sd" />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center text-black text-xl w-full col-span-3">No data</div>
        )}
      </div>
      <div className="w-full mt-2 font-bold flex items-center justify-center">
        <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text-red p-2 rounded-full gap-2" to={`/allgames?activeModalValue=${1}`}>
          <button className="flex items-center">
            <img className="w-7 h-7" src={viewall} alt="ds" />
            <p className="text-xsm">View All</p>
          </button>
        </Link>
      </div> */}
    </>
  );
}

export default PopularGamesList;
