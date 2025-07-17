
import { Link, useNavigate } from "react-router-dom";
import lotterycategorywingo from "../assets/usaAsset/homeScreen/lotterycategorywingo.png"
import lotterycategorytrx from "../assets/usaAsset/homeScreen/lotterycategorytrx.png"
import aviator from "../assets/aviator/aviator.png"
import Trx from "../assets/usaAsset/homeScreen/lotterycategorytrx.png"
import k3 from "../assets/usaAsset/homeScreen/kk3.png"
import d5d from "../assets/usaAsset/homeScreen/d5d.png"
import viewall from "../assets/usaAsset/homeScreen/viewall.png"
import gamecategoryminigames from "../assets/usaAsset/homeScreen/gamecategoryminigames.png"
import min from "../assets/usaAsset/homeScreen/min.png"
import { useEffect, useState } from "react";
import { fetchAllGamesSpribe, fetchGameURLSpribe } from "../reusable_component/gameApi";
import Loader from "../reusable_component/Loader/Loader";

function LotteryGamesList() {
    const [loading,setLoading]=useState(false)
    const [allGamesListView, setAllGamesListView] = useState(null)
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    useEffect(() => {
        fetchAllGamesSpribe(setAllGamesListView);
    }, []);
    // console.log("allGamesListView?.data?.message?.data", allGamesListView?.data?.message?.data[0]?.game_id_long)
    const games = [
      {
        id: 1,
        name: "Win Go",
        image: lotterycategorywingo,
        route: "/lottery/wingo",
        description1: "Guess Number",
        description2: "Green/Red/Violet to win",
        bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      },
      {
        id: 2,
        name: "Aviator",
        image: aviator,
        route: "/ComingSoon",
        // route: "/aviator",
        description1: "Guess Number",
        description2: "Green/Red/Violet to win",
        bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      },
      {
        id: 3,
        name: "Trx Win Go",
        image: Trx,
        // route: "/lottery/trxwingo",
        route: "/ComingSoon",
        description1: "Guess Number",
        description2: "Green/Red/Violet to win",
        bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      },
      {
        id: 4,
        name: "K3",
        image: k3,
        route: "/ComingSoon",
        description1: "Guess Number",
        description2: "Green/Red/Violet to win",
        bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      },
      {
        id: 5,
        name: "5d",
        image: d5d,
        route: "/ComingSoon",
        description1: "Guess Number",
        description2: "Green/Red/Violet to win",
        bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]",
      },
    ];
    // const games2 = [
    //     { id: 1, name: "Mines", image: min, route: "/comingsoon", description1: "Choose Boxes", description2: "", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    //     { id: 2, name: "K3", image: k3, route: "/comingsoon", description1: "Guess Number", description2: "Big/Small/Odd/Even", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    //     { id: 3, name: "5D", image: d5d, route: "/comingsoon", description1: "Guess Number", description2: "Big/Small/Odd/Even", bgColor: "bg-gradient-to-l from-[#ff9a8e] to-[#f95959]" },
    // ];
    return (
        <>
              {loading && <Loader setLoading={setLoading} loading={loading} />}
            {games?.map((game) => (
                <Link className="w-full mb-2 flex items-center justify-center" to={`${game?.route}`} key={game.id}>
                    <div className={`${game.bgColor} flex justify-between px-1  pt-1 pb- w-full rounded-3xl`}>
                        <div className="col-span-1 pl-3">
                            <p className="font-bold text-lg">{game.name}</p>
                            <p className="text-xs font-semibold text-slate-200 mt-2.5">
                                {game.description1}
                            </p>
                            <p className="text-xs font-semibold text-slate-200 mt-1">
                                {game.description2}
                            </p>
                        </div>
                        <div className="col-span-1 w-[89px] h-[80px] flex justify-end ">
                            <img className="w-full h-full" src={game?.image} alt="Win Go" />
                        </div>
                    </div>
                </Link>
            ))}

            {/* <div onClick={() => fetchGameURLSpribe(allGamesListView?.data?.message?.data[0]?.game_id_long, userId,navigate,setLoading)} 
             className={`bg-gradient-to-l from-[#ff9a8e] to-[#f95959] flex justify-between px-1  pt-1 pb- w-full rounded-3xl`}>
                <div className="col-span-1 pl-3">
                    <p className="font-bold text-lg">Aviator</p>
                    <p className="text-xs font-semibold text-slate-200 mt-2.5">
                        Fly high
                    </p>
                    <p className="text-xs font-semibold text-slate-200 mt-1">

                    </p>
                </div>
                <div className="col-span-1 w-[89px] h-[80px] flex justify-end ">
                    <img className="w-full h-full" src={gamecategoryminigames} alt="Win Go" />
                </div>
            </div> */}
            {/* </Link>
            ))} */}
          
           {/* {games2?.map((game) => (
                <Link className="w-full mb-2 mt-2 flex items-center justify-center" to={`${game?.route}`} key={game.id}>
                    <div className={`${game.bgColor} flex justify-between px-1  pt-1 pb- w-full rounded-3xl`}>
                        <div className="col-span-1 pl-3">
                            <p className="font-bold text-lg">{game.name}</p>
                            <p className="text-xs font-semibold text-slate-200 mt-2.5">
                                {game.description1}
                            </p>
                            <p className="text-xs font-semibold text-slate-200 mt-1">
                                {game.description2}
                            </p>
                        </div>
                        <div className="col-span-1 w-[89px] h-[80px] flex justify-end ">
                            <img className="w-full h-full" src={game?.image} alt="Win Go" />
                        </div>
                    </div>
                </Link>
            ))} */}
            {/* <div className="w-full mt-2 font-bold flex items-center justify-center">
                <Link className="border-[1px] flex items-center justify-center w-full border-bg2 text-red p-2 rounded-full gap-2" to={`/allgames?activeModalValue=${0}`}>
                    <button className="flex items-center">
                        <img className="w-7 h-7" src={viewall} alt="ds" />
                        <p className="text-xsm">View All</p>
                    </button>
                </Link>
            </div> */}
        </>
    );
}

export default LotteryGamesList;
