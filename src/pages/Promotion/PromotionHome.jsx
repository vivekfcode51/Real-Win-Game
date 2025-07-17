import promotionbg from '../../assets/usaAsset/promotion/promotionbg.png'
import invitation_code from '../../assets/usaAsset/promotion/invitation_code.png'
import sub_ordinate_icon from '../../assets/usaAsset/promotion/sub_ordinate_icon.png'
import rebate_ratio from '../../assets/usaAsset/promotion/rebate_ratio.png'
import invitation from '../../assets/usaAsset/promotion/invitation.png'
import customer from '../../assets/usaAsset/promotion/customer.png'
import commission_icon from '../../assets/usaAsset/promotion/commission_icon.png'
import promotions_data from '../../assets/usaAsset/promotion/promotions_data.png'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import apis from "../../utils/apis"
import FirstDepositModal from '../../reusable_component/FirstDepositModal'
import Loader from '../../reusable_component/Loader/Loader'
function PromotionHome() {
    const [loading, setLoading] = useState(false);
    const [firstDepsoitModal, setFirstDepsoitModal] = useState(localStorage.getItem("firstDepositModalValue") === "1");
    const [copyInvitation, setCopyInvitation] = useState(false)
    const [copyInvitationCode, setCopyInvitationCode] = useState(false)
    const [promotionData, setPromotionData] = useState(null)
    const [myDetails, setMyDetails] = useState(null)
    const userId = localStorage.getItem("userId")
    const navigate = useNavigate()
    const profileDetails = async () => {
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        try {
            const res = await axios.get(`${apis?.profile}${userId}`);
            // console.log("profile",res)
            if (res?.data?.success === 200) {
                setMyDetails(res?.data)
            }
        } catch (err) {
            toast.error(err);
        }
    };

    useEffect(() => {
        if (userId) {
            profileDetails();
        }
    }, [userId]);
    // console.log("myDetailsmyDetails",myDetails)
    const promotionDataHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${apis?.promotionData}${userId}`)
            // console.log("resooooo",res)
            if (res?.data?.status === 200) {
                setLoading(false)
                setPromotionData(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (er) {
            setLoading(false)
            toast.error(er)
        }
    }
    useEffect(() => {
        if (userId) {
            promotionDataHandler()
        }
    }, [userId])
    const handleCopyInvitationLink = () => {
        console.log("myDetails",myDetails)
        if (myDetails?.data?.referral_code_url) {
            const invitationCode = myDetails?.data?.referral_code_url
            const referralLink = invitationCode
            navigator.clipboard
                .writeText(referralLink)
                .then(() => {
                    setCopyInvitation(true)
                })
                .catch(() => {
                    toast.error('Failed to copy refer url .');
                });
        } else {
            toast.error('refer url is not available.');
        }
    };

    const handleCopyInvitationCode = () => {
        if (myDetails?.data?.u_id) {
            navigator.clipboard
                .writeText(myDetails?.data?.referral_code)
                .then(() => {
                    setCopyInvitationCode(true)
                })
                .catch(() => {
                    toast.error('Failed to copy UID.');
                });
        } else {
            toast.error('UID is not available.');
        }
    };

    useEffect(() => {
        if (copyInvitation) {
            handleCopyInvitationLink()
            const timer = setTimeout(() => {
                setCopyInvitation(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copyInvitation, setCopyInvitation]);

    useEffect(() => {
        if (copyInvitationCode) {
            handleCopyInvitationCode()
            const timer = setTimeout(() => {
                setCopyInvitationCode(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [copyInvitationCode, setCopyInvitationCode]);

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
            <div className='bg-white  h-full w-full'>
                <div className='w-full flex flex-col px-3 items-center bg-[#f95959] h-64 bg-center bg-cover'
                    style={{
                        backgroundImage: `url(${promotionbg})`
                    }}
                >
                    <p className='text-2xl mt-5'>{promotionData?.yesterday_total_commission ? Number(promotionData.yesterday_total_commission).toFixed(2) : "0.00"}</p>
                    <p className='bg-white text-[15px] mt-1 rounded-full px-2 py-1 text-redLight'>Yesterday&apos;s total commission</p>
                    <p className='text-xs mt-1'>Upgrade the level to increase commission income</p>
                    <div className='bg-white shadow-md pb-2 w-full mt-2 rounded-lg'>
                        <div className='flex justify-between items-start text-xsm gap-[1px] w-full'>
                            <div className='bg-redLight py-2.5 text-center rounded-tl-lg w-full '>Direct subordinates</div>
                            <div className='bg-redLight py-2.5 text-center rounded-tr-lg w-full '>Team subordinates</div>
                        </div>
                        <div className='grid w-full grid-cols-2'>
                            <div className='text-black text-xs col-span-1 flex flex-col items-center px-2'>
                                <div className='flex flex-col items-center pt-3'>
                                    <p>{promotionData?.register}</p>
                                    <p>number of register</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p className='text-green'>{promotionData?.deposit_number}</p>
                                    <p>Deposit number</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p className='text-red'>{promotionData?.deposit_amount}</p>
                                    <p>Deposit amount</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p>{promotionData?.first_deposit}</p>
                                    <p className='text-center'>Number of people making first deposit</p>
                                </div>
                            </div>
                            <div className='text-black text-xs col-span-1 flex flex-col items-center px-2'>
                                <div className='flex flex-col items-center pt-3'>
                                    <p>{promotionData?.subordinates_register}</p>
                                    <p>number of register</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p className='text-green'>{promotionData?.subordinates_deposit_number}</p>
                                    <p>Deposit number</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p className='text-red'>{promotionData?.subordinates_deposit_amount}</p>
                                    <p>Deposit amount</p>
                                </div>
                                <div className='flex flex-col items-center pt-3'>
                                    <p>{promotionData?.subordinates_first_deposit}</p>
                                    <p className='text-center'>Number of people making first deposit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-5 text-[15px] mt-32 pb-40 bg-white w-full'>
                    <button onClick={() => setCopyInvitation(true)} className='w-full font-semibold py-1.5 rounded-full bg-gradient-to-l from-[#ff9a8e] to-[#f95959]'>INVITATION LINK</button>
                    <div onClick={() => setCopyInvitationCode(true)} className='w-full cursor-pointer flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={invitation_code} alt="ds" />
                            <p>Copy inviation code</p>
                        </div>
                        <div className='text-xsm text-lightGray'>{myDetails?.data?.referral_code}</div>
                    </div>
                    <Link to="/promotion/subordinatedata" className='w-full flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={sub_ordinate_icon} alt="ds" />
                            <p>Subordinate data</p>
                        </div>
                        <div className='text-xsm text-black'><MdKeyboardArrowRight size={30} /></div>
                    </Link>
                    <Link to="/promotion/commissiondetail" className='w-full flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={commission_icon} alt="ds" />
                            <p>Commission details</p>
                        </div>
                        <div className='text-xsm text-black'><MdKeyboardArrowRight size={30} /></div>
                    </Link>
                    <Link to="/promotion/invitationrules" className='w-full flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={invitation} alt="ds" />
                            <p>Invitation rules</p>
                        </div>
                        <div className='text-xsm text-black'><MdKeyboardArrowRight size={30} /></div>
                    </Link>
                    <div className='w-full flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={customer} alt="ds" />
                            <p>Agent line customer service</p>
                        </div>
                        <div className='text-xsm text-black'><MdKeyboardArrowRight size={30} /></div>
                    </div>
                    <Link to="/promotion/rebateratio" className='w-full flex items-center justify-between mt-10'>
                        <div className='flex items-center gap-2 text-black'>
                            <img className='w-9 h-9' src={rebate_ratio} alt="ds" />
                            <p>Rebate ratio</p>
                        </div>
                        <div className='text-xsm text-black'><MdKeyboardArrowRight size={30} /></div>
                    </Link>
                    <div className='mt-8'>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 h-8' src={promotions_data} alt="df" />
                            <h1 className='text-black font-bold'>promotion data</h1>
                        </div>
                        <div className='grid grid-cols-2 mt-3 text-xsm'>
                            <div className='col-span-1 flex flex-col items-center border-r-[1px] border-border1'>
                                <p className='text-black text-sm'>{promotionData?.weekly_commission ? Number(promotionData.weekly_commission).toFixed(2) : "0"}</p>
                                <p className='text-gray'>This weak</p>
                            </div>
                            <div className='col-span-1 flex flex-col items-center'>
                                <p className='text-black text-sm'>{promotionData?.total_commission ? Number(promotionData.total_commission).toFixed(2) : "0"}</p>
                                <p className='text-gray'>Total commision</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 mt-3 text-xsm'>
                            <div className='col-span-1 flex flex-col items-center border-r-[1px] border-border1'>
                                <p className='text-black text-sm'>{promotionData?.direct_subordinate ? Number(promotionData.direct_subordinate).toFixed(2) : "0"}</p>
                                <p className='text-gray'> direct subordinates</p>
                            </div>
                            <div className='col-span-1 flex flex-col items-center'>
                                <p className='text-black text-sm'>{promotionData?.team_subordinate ? Number(promotionData.team_subordinate).toFixed(2) : "0"}</p>
                                <p className='text-gray text-center'>Total number subordinates in the team</p>
                            </div>
                        </div>
                    </div>
                </div>
                {copyInvitation && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="h-14 w-[300px] bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <p>Copy successfull</p>
                        </div>
                    </div>
                )}
                {copyInvitationCode && (
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <div className="h-14 w-[300px] bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
                            <p>Copy successfull</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PromotionHome