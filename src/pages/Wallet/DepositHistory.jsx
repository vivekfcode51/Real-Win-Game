import moment from "moment";
import no_data_available from '../../assets/images/no_data_available.png';
import { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
import { PiCopyLight } from 'react-icons/pi';
import { toast } from 'react-toastify';
import axios from 'axios';
import apis from '../../utils/apis'
import { useNavigate } from 'react-router-dom';
import usdt_icon from '../../assets/images/usdt_icon.png';
import payzaar from "../../assets/payzaar.png";
// import bank_card from "../../assets/usaAsset/wallet/bank_card.png"
import Loader from "../../reusable_component/Loader/Loader";
// import ipRemovedbg from "../../assets/usaAsset/ipRemovedbg.png"
// import kuberPayLogo from "../../assets/usaAsset/kuberPayLogo.png"
function DepositHistory() {
    const [activeModal, setActiveModal] = useState(-1);
    // const [payModesList, setPayModesList] = useState(0);
    const [modalFirst, handleModalFirst] = useState(false);
    const [modalFirstValue, handleModalFirstValue] = useState(0);
    const [modalSecond, handleModalSecond] = useState(false);
    const [confirmedDate, setConfirmedDate] = useState("Select date");
    const [depositHistoryData, setDepositHistoryData] = useState(null)
    const [isOrderidCopied, setIsOrderidCopied] = useState(false)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const modalSecondRef = useRef(null);
    const userId = localStorage.getItem("userId");

    const toggleModal = (modalType) => {
        setActiveModal((prev) => (prev === modalType ? modalType : modalType));
    };
   
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleModalFirst(false);
            }
        };

        if (modalFirst) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalFirst]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalSecondRef.current && !modalSecondRef.current.contains(event.target)) {
                handleModalSecond(false);
            }
        };

        if (modalSecond) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalSecond]);
   
    const depositHistory = async (t) => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            let res
            if (t === -1) {
                res = await axios.get(`${apis?.depositHistory}?user_id=${userId}`)
            } else {
                
                res = await axios.get(`${apis?.depositHistory}?user_id=${userId}&type=${t}`)
            }
            if (res?.data?.status === 200) {
                setLoading(false)
                setDepositHistoryData(res?.data?.data)
            } else {
                setLoading(false)
                setDepositHistoryData(null)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        if (userId) {
            depositHistory(activeModal);
        }
    }, [userId, activeModal]);

    const handleCopyOrderId = (orderid) => {
        if (orderid) {
            navigator.clipboard
                .writeText(orderid)
                .then(() => {
                    setIsOrderidCopied(true)
                })
                .catch(() => {
                    toast.error('Failed to copy UID.');
                });
        } else {
            toast.error('UID is not available.');
        }
    };
    useEffect(() => {
        if (isOrderidCopied) {
            const timer = setTimeout(() => {
                setIsOrderidCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOrderidCopied, setIsOrderidCopied]);

    const payMethod = [{
        image: payzaar,
        name: "Manual",
        type: 0
    },
    // {
    //     image: usdt_icon,
    //     name: "USDT",
    //     type: 2
    // }
    ]
    return (
        <>
            <div className='w-full'>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
                <div className="hide-scrollbar overflow-x-auto py-3 mx-3">
                    <div className="flex gap-2 text-xsm font-bold">
                        <div
                            className={`w-32 py-3 flex-shrink-0 flex items-center justify-between shadow-lg rounded-lg ${activeModal === -1 ? "bg-gradient-to-l from-[#ff9a8e] to-[#f95959] text-white" : "bg-white text-gray"
                                }  px-7 cursor-pointer`}
                            onClick={() => toggleModal(-1)}
                        >
                            <RxDashboard className={``} size={20} />
                            <p className="font-bold text-nowrap">All</p>
                        </div>
                        {payMethod && payMethod?.map((item, i) => (
                            <div key={i}
                                className={`w-32 py-3 flex-shrink-0 flex-col flex items-center justify-between shadow-lg rounded-lg ${activeModal == item?.type ? "bg-gradient-to-l from-[#ff9a8e] to-[#f95959] text-white" : "bg-white text-gray"
                                    }  px-3 cursor-pointer`}
                                onClick={() => toggleModal(item?.type)}
                            >
                                {/* <img className='w-20 h-12' src={item?.image} alt="UPI Payment" /> */}
                                <p className="font-semibold">Manual</p>
                                <p className="font-semibold">Payment</p>
                                {/* <p className=" font-bold text-nowrap">{item?.name}</p> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 mx-3">
                    <button
                        onClick={() => handleModalFirst(!modalFirst)}
                        className="bg-white text-black rounded-md text-xs font-bold py-4 px-2 flex justify-between items-center shadow-md"
                    >
                        <p>{modalFirstValue === 0 ? "All" : modalFirstValue === 1 ? "To be paid" : modalFirstValue === 2 ? "Paid" : modalFirstValue === 3 ? "Rejected" : ""}</p>
                        <p>
                            <IoIosArrowDown size={18} />
                        </p>
                    </button>
                    <button className="bg-white text-black rounded-md text-xs font-bold py-4 px-2 flex justify-center items-center shadow-md">
                        <input
                            className='outline-none'
                            onChange={(e) => setConfirmedDate(e.target.value)}
                            type="date"
                        />
                    </button>
                </div>

                <div className="px-3 mt-3">
                    {depositHistoryData && depositHistoryData?.length > 0 ? (
                        depositHistoryData
                            ?.filter((item) => {
                                if (modalFirstValue !== 0 && modalFirstValue !== item.status) {
                                    return false;
                                }
                                if (confirmedDate !== "Select date" && !item?.created_at.startsWith(confirmedDate)) {
                                    return false;
                                }
                                return true;
                            })
                            ?.map((item, i) => (
                                <div className="bg-white rounded-lg p-2" key={i}>
                                    <div className="flex text-gray justify-between items-center">
                                        <p className="bg-green text-white rounded-lg px-3 py-0.5">Deposit</p>
                                        <p className="text-xsm text-black font-semibold">
                                            {item.status === 1
                                                ? "Pending"
                                                : item?.status === 2
                                                    ? "Paid"
                                                    : item?.status === 3
                                                        ? "Rejected"
                                                        : ""}
                                        </p>
                                    </div>
                                    <div className="bg-border1 mt-3 w-full h-[1px]"></div>
                                    <div className="flex mt-3 text-gray justify-between items-center">
                                        <p className="text-xsm font-bold">Balance</p>
                                        <p className="text-xsm font-semibold text-red">₹{item?.cash}.00</p>
                                    </div>
                                    <div className="flex mt-4 text-gray justify-between items-center">
                                        <p className="text-xsm font-bold">Type</p>
                                        <p className="text-xsm text-gray font-semibold">{item?.type == 0 ? "Manual" : item?.type == 1 ? "Bank card" : item?.type === 2 ? "USDT" : ""}</p>
                                    </div>
                                    <div className="flex mt-4 text-gray justify-between items-center">
                                        <p className="text-xsm font-bold">Time</p>
                                        <p className="text-xsm text-gray font-semibold">
                                            {moment(item?.created_at).format("DD-MM-YYYY HH:mm:ss")}
                                        </p>
                                    </div>
                                    <div className="flex my-4 text-gray justify-between items-center">
                                        <p className="text-xsm font-bold">Order Number</p>
                                        <p className="text-xsm flex items-center text-gray font-semibold">
                                            {item?.order_id} &nbsp;
                                            <PiCopyLight onClick={() => handleCopyOrderId(item?.order_id)} size={15} />
                                        </p>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="flex flex-col items-center mt-10">
                            <img src={no_data_available} alt="No data" />
                            <p className="mt-10 text-black">No data</p>
                        </div>
                    )}
                </div>


                {modalFirst && (
                    <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
                        <div
                            ref={modalRef}
                            className="bg-bg2 p-3 rounded-t-xl h-48 w-full xsm:w-[400px]"
                        >
                            <button
                                onClick={() => handleModalFirst(false)}
                                className="text-white"
                            >
                                Cancel
                            </button>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => {
                                        handleModalFirstValue(0);
                                        handleModalFirst(false);
                                    }}
                                    className={`${modalFirstValue === 0 ? "text-black" : "text-white"
                                        }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => {
                                        handleModalFirstValue(1);
                                        handleModalFirst(false);
                                    }}
                                    className={`${modalFirstValue === 1 ? "text-black" : "text-white"
                                        }`}
                                >
                                    To be Paid
                                </button>
                                <button
                                    onClick={() => {
                                        handleModalFirstValue(2);
                                        handleModalFirst(false);
                                    }}
                                    className={`${modalFirstValue === 2 ? "text-black" : "text-white"
                                        }`}
                                >
                                    Paid
                                </button>
                                <button
                                    onClick={() => {
                                        handleModalFirstValue(3);
                                        handleModalFirst(false);
                                    }}
                                    className={`${modalFirstValue === 3 ? "text-black" : "text-white"
                                        }`}
                                >
                                    Rejected
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {isOrderidCopied && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="h-28 w-36 bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <p className='text-center'>Order number copied to  <br />clipboard!</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default DepositHistory;
