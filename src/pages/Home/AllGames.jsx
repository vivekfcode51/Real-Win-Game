import { useEffect, useState } from 'react'
import { fetchAllGames, fetchAllGamesSpribe, fetchGameURL, fetchGameURLSpribe, updateUserWalletFromJili, updateUserWalletFromSpribe } from "../../reusable_component/gameApi";
import jilli1 from "../../assets/usaAsset/homeScreen/JILLI1.png"
import jilli2 from "../../assets/usaAsset/homeScreen/JILLI2.png"
import jilli3 from "../../assets/usaAsset/homeScreen/JILLI3.png"
import jilli4 from "../../assets/usaAsset/homeScreen/JILLI4.png"
import jilli5 from "../../assets/usaAsset/homeScreen/JILLI5.png"
import jilli6 from "../../assets/usaAsset/homeScreen/JILLI6.png"
import wingoNew from "../../assets/usaAsset/homeScreen/wingonew.jpeg"
import k3new from "../../assets/usaAsset/homeScreen/k3new.png"
import new5d from "../../assets/usaAsset/homeScreen/new5d.png"
import aviatornew from "../../assets/usaAsset/homeScreen/aviatornew.png"
import gamecategoryminigames from "../../assets/usaAsset/homeScreen/aviatornew.png"
import minesnew from "../../assets/usaAsset/homeScreen/minesnew.png"
import trx_colnew from "../../assets/usaAsset/homeScreen/trx_colnew.png"
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from '../../reusable_component/Loader/Loader';
function AllGames() {
    const [allGamesListView, setAllGamesListView] = useState(null)
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId")
    const [searchParams] = useSearchParams();
    const activeModalValue = searchParams.get('activeModalValue');
    const [activeModal, setActiveModal] = useState(activeModalValue);

    const toggleModal = (modalType) => {
        setActiveModal((prev) => (prev === modalType ? modalType : modalType));
    };
    const navigate = useNavigate()
    const payMethod = [{
        image: jilli6,
        image1: jilli5,
        name: "Lottery",
        type: 0
    },
//     {
//         image: jilli3,
//         image1: jilli2,
//         name: "Jilli",
//         type: 1
//     },
//    {
//         image: jilli1,
//         image1: jilli4,
//         name: "Spribe",
//         type: 2
//     }
]

    useEffect(() => {
        if (activeModal == 1) {
            fetchAllGames(setAllGamesListView);
        } else if (activeModal == 2) {
            fetchAllGamesSpribe(setAllGamesListView);
        }
    }, [activeModal]);
    // window.location.reload(); 

    useEffect(() => {
        const updateWallet = async () => {

            const statusJili = localStorage.getItem("jilligamePlayed") || "0";
            const statusSpribe = localStorage.getItem("spribegamePlayed") || "0";

            console.log("Status Jili:", statusJili);
            console.log("Status Spribe:", statusSpribe);

            if (statusJili === "1") {
                await updateUserWalletFromJili();
                localStorage.setItem("jilligamePlayed", "0");
            }

            if (statusSpribe === "1") {
                await updateUserWalletFromSpribe();
                localStorage.setItem("spribegamePlayed", "0");
            }
        };

        // Run on page load
        updateWallet();

        // Detect if user switches back to this tab/page
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                updateWallet();
            }
        };

        // Detect if localStorage was changed
        const handleStorageChange = (event) => {
            if (event.key === "jilligamePlayed" || event.key === "spribegamePlayed") {
                updateWallet();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("storage", handleStorageChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


    const LotteryGames = [
        { id: 1, name: "Win Go", image: wingoNew, route: "/lottery/wingo", description1: "Guess Number", description2: "Green/Red/Violet to win" },
        // { id: 2, name: "Trx Win", image: trx_colnew, route: "/lottery/trxwingo", description1: "Guess Number", description2: "Green/Red/Violet to win" },
        // { id: 3, name: "K3", image: k3new, route: "/comingsoon", description1: "Guess Number", description2: "Big/Small/Odd/Even" },
        // { id: 4, name: "5D", image: new5d, route: "/comingsoon", description1: "Guess Number", description2: "Big/Small/Odd/Even" },
        { id: 2, name: "Aviator", image: aviatornew, route: "/comingsoon", description1: "Fly High", description2: "" },
        // { id: 6, name: "Mines", image: minesnew, route: "/comingsoon", description1: "Choose Boxes", description2: "" },
    ];
    // console.log("allGamesListView", allGamesListView)
    return (
        <div>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <div className="hide-scrollbar overflow-x-auto py-3 mx-3">
                <div className="flex gap-2 text-xsm font-bold">
                    {payMethod && payMethod?.map((item, i) => (
                        <div key={i}
                            className={`w-32  xsm:py-3 flex-shrink-0 flex flex-col items-center justify-between shadow-lg rounded-lg ${activeModal == item?.type ? "bg-gradient-to-l from-redLight to-red text-white" : "bg-white text-gray"
                                }  px-3 cursor-pointer`}
                            onClick={() => toggleModal(item?.type)}
                        >
                            <img className='w-24 h-8 xsm:h-10' src={activeModal == item?.type ? item?.image : item?.image1} alt="UPI Payment" />
                            <p className=" font-bold text-nowrap">{item?.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-3 w-full">
                {allGamesListView && activeModal == 1 ? (
                    allGamesListView?.data?.data?.map((item, i) => (
                        <div onClick={() => fetchGameURL(item?.id, userId, navigate, setLoading)} key={i} className="flex flex-col items-center text-black p-2">
                            <img src={item?.img} className="w-36 h-32 rounded-lg" alt="sd" />
                        </div>
                    ))
                ) : allGamesListView && activeModal == 2 ? (
                    allGamesListView?.data?.message?.data?.map((item, i) => (
                        <div onClick={() => fetchGameURLSpribe(item?.game_id_long, userId, navigate, setLoading)} key={i} className="flex flex-col items-center text-black p-2">
                            <img src={item?.game_image} className="w-36 h-32 rounded-lg" alt="sd" />
                        </div>
                    ))
                ) : (
                    <>
                        {LotteryGames?.map((item, i) => (
                            <Link key={i} to={item?.route} >
                                <div className="flex flex-col items-center text-black p-2">
                                    <img src={item?.image} className="w-36 h-32 rounded-lg" alt="sd" />
                                </div>
                            </Link>
                        ))}
                        <div onClick={() => fetchGameURLSpribe(allGamesListView?.data?.message?.data[0]?.game_id_long, userId, navigate, setLoading)} className="flex flex-col items-center text-black p-2">
                            <img src={gamecategoryminigames} className="w-36 h-32 rounded-lg" alt="sd" />
                        </div>
                        <div onClick={() => fetchGameURLSpribe(allGamesListView?.data?.message?.data[6]?.game_id_long, userId, navigate, setLoading)} className="flex flex-col items-center text-black p-2">
                            <img src={minesnew} className="w-36 h-32 rounded-lg" alt="sd" />
                        </div>

                    </>)}
            </div>
        </div>
    )
}

export default AllGames