import { useEffect, useState } from 'react'
import { HiMiniArrowPathRoundedSquare } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setProfileDetails } from "../../features/ProfileDetailsSlice"
import walletnew from "../../assets/icons/walletnew.png"
import profilevip1 from "../../assets/icons/profilevip1.png"
import bet_history from "../../assets/icons/bet_history.png"
import trans_history from "../../assets/icons/trans_history.png"
import { FaRegCopy } from 'react-icons/fa'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { MdKeyboardArrowRight } from 'react-icons/md'
import axios from 'axios';
import { toast } from 'react-toastify';
import deposit from "../../assets/usaAsset/account/deposit.png"
import depositHis from "../../assets/usaAsset/account/depositHis.png"
import exclamation from "../../assets/usaAsset/account/exclamation.png"
import vip from "../../assets/usaAsset/account/vip.png"
import withdraw from "../../assets/usaAsset/account/withdraw.png"
import withdrawHis from "../../assets/usaAsset/account/withdrawHis.png"
import gifts from "../../assets/usaAsset/account/gifts.png"
import statistics from "../../assets/usaAsset/account/statistics.png"
import setting from "../../assets/usaAsset/account/setting.png"
import guide from "../../assets/usaAsset/account/guide.png"
import aboutus from "../../assets/usaAsset/account/aboutus.png"
import languageIcon from "../../assets/usaAsset/account/languageIcon.png"
import usaserviceIcon from "../../assets/icons/usaServiceIcon.png";
import FirstDepositModal from '../../reusable_component/FirstDepositModal';
import Loader from '../../reusable_component/Loader/Loader';
import apis from '../../utils/apis'
const profileApi = apis.profile

function Profile() {
    const [langModal, setLangModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [myDetails, setMyDetails] = useState(null)
    const [isUidCopied, setIsUidCopied] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false);
    const [firstDepsoitModal, setFirstDepsoitModal] = useState(localStorage.getItem("firstDepositModalValue") === "1");

    const [isLogout, setIsLogout] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const avatar = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg";

    const logoutHandler = () => {
        localStorage.removeItem("userId");
        navigate("/login");
    };

    const profileDetails = async (userId) => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${profileApi}${userId}`);
            if (res?.data?.success === 200) {
                setLoading(false)
                setMyDetails(res?.data)
                const total_wallet = res?.data?.data?.wallet + res?.data?.data?.third_party_wallet
                dispatch(setProfileDetails({ total_wallet }))
            }
        } catch (err) {
            setLoading(false)
            toast.error(err);
        }
    };

    useEffect(() => {
        if (userId) {
            profileDetails(userId);
        }
    }, [userId]);

    useEffect(() => {
        const userid= localStorage.getItem("userId")
        // console.log("userid",userid)
        const status = localStorage.getItem("firstDepositModalValue");
        if (status === "0"&&userid) {
            setFirstDepsoitModal(true);
        } else {
            setFirstDepsoitModal(false);
        }
    }, [])
    const handleCopyUID = () => {
        if (myDetails?.data?.u_id) {
            navigator.clipboard
                .writeText(myDetails?.data?.u_id)
                .then(() => {
                    setIsUidCopied(true)
                })
                .catch(() => {
                    toast.error('Failed to copy UID.');
                });
        } else {
            toast.error('UID is not available.');
        }
    };
    useEffect(() => {
        if (isUidCopied) {
            const timer = setTimeout(() => {
                setIsUidCopied(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isUidCopied, setIsUidCopied]);

    useEffect(() => {
        if (langModal) {
            const timer = setTimeout(() => {
                setLangModal(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [langModal, setLangModal]);

    const toggleLogout = () => {
        if (isLogout) {
            // Start exit animation
            setIsAnimating(true);
            setTimeout(() => {
                setIsLogout(false);
                setIsAnimating(false);
            }, 300); // Match this duration to the CSS transition
        } else {
            setIsLogout(true);
        }
    };

    return (
        <>
        {loading && <Loader setLoading={setLoading} loading={loading} />}
            {firstDepsoitModal && (
                <div className="relative z-50 font-roboto">
                    <FirstDepositModal
                        firstDepsoitModal={firstDepsoitModal}
                        setFirstDepsoitModal={setFirstDepsoitModal}
                        onClose={() => setFirstDepsoitModal(false)}
                    /></div>
            )}

            <div className='h-full w-full font-roboto mb-80'>
                {/* balance div */}
                <div className='bg-bg2 relative h-[35%] 3xl:h-[30%] px-3 flex justify-center rounded-b-[2rem]'>
                    <div className='grid grid-cols-4 px-3'>
                        <div className='col-span-1 flex items-center -mt-20 justify-center'>
                            <Link to="/changeavatar"> <img src={myDetails?.data?.image ? myDetails?.data?.image : avatar} className='w-20 h-20 rounded-full' alt="not found" /></Link>
                        </div>
                        <div className='col-span-3 flex flex-col justify-center -mt-20 px-2'>
                            <div className=' flex items-center justify-start gap-2'>
                                <p className='capitalise text-sm'>{myDetails?.data?.name}</p>
                                <img className='h-6 w-14' src={profilevip1} alt="not found" />
                            </div>
                            <div className='mt-3 text-xsm rounded-full w-48 flex items-center justify-start'>
                                UID &nbsp;&nbsp;|&nbsp;&nbsp;{myDetails?.data?.u_id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button onClick={handleCopyUID}> <FaRegCopy /></button>
                            </div>
                            <div className='mt-1 text-xsm'>Last Login : {myDetails?.last_login_time}</div>
                        </div>
                    </div>
                    <div className="absolute bg-white shadow-lg left-3 right-3 top-40 px-3 pt-3 pb-6 rounded-md text-sm ">
                        <h1 className='text-black '>Total balance</h1>
                        <p className='flex items-center font-bold text-black'> <b className='text-xl'>₹</b>  {myDetails ? Number(myDetails?.data?.wallet + myDetails?.data?.third_party_wallet).toFixed(2) : "0.00"} &nbsp; <span><HiMiniArrowPathRoundedSquare onClick={() => profileDetails(userId)} className='text-gray text-xl' />
                        </span></p>
                        <div className='w-full bg-border1 mt-3 h-[1px]'></div>
                        <div className='grid grid-cols-4 mt-5 text-black'>
                            <Link className='col-span-1 flex flex-col items-center justify-center' to="/wallet">
                                <img src={walletnew} className='h-8 w-8' alt="not fond" />
                                <p className=''> Wallet</p>
                            </Link>
                            <Link className='col-span-1 flex flex-col items-center justify-center' to="/wallet/deposit">
                                <img src={deposit} className='h-8 w-8 ' alt="not fond" />
                                <p className=''>  Deposit</p>
                            </Link>
                            <Link className='col-span-1 flex flex-col items-center justify-center' to="/wallet/withdrawal">
                                <img src={withdraw} className='h-8 w-8 ' alt="not fond" />
                                <p className=''> Withdraw</p>
                            </Link>
                            <Link className='col-span-1 flex flex-col items-center justify-center' to="/vip">
                                <img src={vip} className='h-8 w-8 ' alt="not fond" />
                                <p className=''> VIP</p>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* 3rd div */}
                <div className='grid grid-cols-2 mx-3 gap-2 mt-24 xsm:mt-28'>
                    <button >
                        <Link to="/alltransactionhistory" className='col-span-1 px-2 py-4 rounded-md flex items-center bg-white justify-start' >
                            <img src={trans_history} className='rounded-full h-10 w-10' alt="not found" />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-sm text-black'>Transaction</h1>
                                <h1 className=' text-xs text-gray'> My Transaction History</h1>
                            </div>
                        </Link>
                    </button>

                    <button >
                        <Link to="/wallet/deposithistory" className='col-span-1 px-2 py-4 rounded-md flex items-center bg-white justify-start' >
                            <img src={depositHis} className='rounded-full h-10 w-10' alt="not found" />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-sm text-black'>Deposit</h1>
                                <h1 className=' text-xs  text-gray'> My Deposit History</h1>
                            </div>
                        </Link>
                    </button>
                    <button >
                        <Link to="/wallet/withdrawalhistory" className='col-span-1 px-2 py-4 rounded-md flex items-center bg-white justify-start' >
                            <img src={withdrawHis} className='rounded-full h-10 w-10' alt="not found" />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-sm text-black'>Withdraw</h1>
                                <h1 className=' text-xs text-gray'> My Withdraw History</h1>
                            </div>
                        </Link>
                    </button>
                    <button >
                        <Link to="/gamehistory" className='col-span-1 px-2 py-4 rounded-md flex items-center bg-white justify-start' >
                            <img src={bet_history} className='rounded-full h-10 w-10' alt="not found" />
                            <div className='flex flex-col items-start'>
                                <h1 className='text-sm text-black'>Game History</h1>
                                <h1 className=' text-xs  text-gray'> My Game History</h1>
                            </div>
                        </Link>
                    </button>
                </div>

                {/*  , gifts*/}
                <div className='bg-white text-gray text-xsm mx-3 mt-3 rounded-md'>
                    <Link to="/activity/gifts" className='px-2 border-b border-border1 py-4  flex justify-between items-center' >
                        <div className='flex items-center'>
                            <img src={gifts} className='rounded-full h-7 w-7' alt="not found" />&nbsp;Gifts
                        </div>
                        <div className='flex items-end'>
                            <MdKeyboardArrowRight size={25} className="text-gray" />
                        </div>
                    </Link>
                    <Link to="/changepassword" className='px-2 border-b border-border1 py-4  flex justify-between items-center'>
                        <div className='flex items-center'>
                            <img src={gifts} className='rounded-full h-7 w-7' alt="not found" />&nbsp;Security & Safety
                        </div>
                        <div className='flex items-center'>
                            <MdKeyboardArrowRight size={25} className="text-gray" />
                        </div>
                    </Link>

                    <Link to="/gamehistory" className='px-2 border-b border-border1 py-4  flex justify-between items-center' >
                        <div className='flex items-center'>
                            <img src={statistics} className='rounded-full h-7 w-7' alt="not found" />&nbsp;Game Statistics
                        </div>
                        <div className='flex items-end'>
                            <MdKeyboardArrowRight size={25} className="text-gray" />
                        </div>
                    </Link>
                    <button onClick={() => setLangModal(true)} className='px-2 w-full border-b border-border1 py-4  flex justify-between items-center' >
                        <div className='flex items-center'>
                            <img src={languageIcon} className='rounded-full h-7 w-7' alt="not found" />&nbsp;Language
                        </div>
                        <div className='flex items-end'>
                            <p className='flex text-gray text-sm items-center justify-center'>English</p>&nbsp;
                            <MdKeyboardArrowRight size={25} className="text-gray" />
                        </div>
                    </button>
                </div>

                {/* service center */}
                <div className='mx-3 mt-3 rounded-md px-3 py-4 bg-white'>
                    <h1 className='text-sm text-black'>Service Center</h1>
                    <div className='grid grid-cols-3 my-5'>
                        <button >
                            <Link to="/setting" className='flex flex-col items-center justify-center pt-2'>
                                <img src={setting} className='h-8 w-8 ' alt="not found" />
                                <p className='text-xs text-gray mt-1'>Settings</p>
                            </Link>
                        </button>
                        {/* <button >
                        <Link to="/feedback" className='flex flex-col items-center justify-center pt-2'>
                            <img src={feedback} className='h-8 w-8 ' alt="not found" />
                            <p className='text-xs text-gray mt-1'>Feedback</p>
                        </Link>
                    </button> */}
                        {/* <button >
                        <Link to="/notifications" className='flex flex-col items-center justify-center pt-2'>
                            <img src={notification} className='h-8 w-8 ' alt="not found" />
                            <p className='text-xs text-gray mt-1'>Notification</p>
                        </Link>
                    </button> */}
                        <button >
                            <Link to="/beginnersguide" className='flex flex-col items-center justify-center pt-2'>
                                <img src={guide} className='h-8 w-8 ' alt="not found" />
                                <p className='text-xs text-gray mt-1'>Beginner&apos;s Guide</p>
                            </Link>
                        </button>
                        <button >
                            <Link to="/customerservices" className='flex flex-col items-center justify-center pt-2'>
                                <img src={usaserviceIcon} className='h-8 w-8 ' alt="not found" />
                                <p className='text-xs text-gray mt-1'>24/7 Customer Service</p>
                            </Link>
                        </button>

                        <button >
                            <Link to="/aboutus" className='flex flex-col items-center justify-center pt-2'>
                                <img src={aboutus} className='h-8 w-8 ' alt="not found" />
                                <p className='text-xs text-gray mt-1'>About us</p>
                            </Link>
                        </button>
                    </div>
                </div>

                {/* logout button */}
                <div className='mx-3 pb-28'>
                    <button onClick={toggleLogout} className='flex items-center justify-center border border-red mt-10  py-0.5 rounded-full w-full text-red'><LiaSignOutAltSolid className='rotate-[-90deg]' size={30} />  &nbsp;  &nbsp; Logout
                    </button>
                </div>
                {langModal && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="h-28 w-36 bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <p>English <br />Language</p>
                        </div>
                    </div>
                )}
                {isUidCopied && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="h-28 w-36 bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <p className='text-center'>UID copied to  <br />clipboard!</p>
                        </div>
                    </div>
                )}
                {isLogout && (
                    <div className={`fixed inset-0 h-screen flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <div className={`py-4 px-5 w-[300px] shadow-lg bg-white rounded-2xl flex flex-col items-center justify-center transform transition-transform duration-300 ${isAnimating ? 'scale-90' : 'scale-100'}`}>
                            <img className='w-20 h-20' src={exclamation} alt="Exclamation" />
                            <p className='text-center text-xl text-black font-bold mt-5'>Do you want to log out?</p>
                            <button onClick={() => logoutHandler()} className='text-center w-full bg-gradient-to-r from-[#f95959] to-[#ff9a8e] text-white rounded-full py-2 mt-5'>
                                Confirm
                            </button>
                            <button onClick={toggleLogout} className='text-center w-full text-red border-[1px] border-red border-gradient-to-r from-[#f95959] to-[#ff9a8e] rounded-full py-2 mt-5'>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile