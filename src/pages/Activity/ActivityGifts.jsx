import apis from '../../utils/apis';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import giftRedeemList from "../../assets/usaAsset/activity/giftRedeemList.png"
import moment from 'moment';
import Loader from '../../reusable_component/Loader/Loader';
function ActivityGifts() {
    const [loading, setLoading] = useState(false);
    const [giftCode, setGiftCode] = useState("")
    const [redeemedGiftList, setRedeemedGiftList] = useState([])
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate()
    const redeemGift = async () => {
        setLoading(true)
        if (!userId) {
            toast.error("User not logged in");
            navigate("/login");
            return;
        }
        const payload = {
            userid: userId,
            code: giftCode
        }
        try {
            const res = await axios.post(apis.redeemGift, payload)
            if (res?.data?.status === 200) {
                setLoading(false)
                toast.success(res?.data?.message)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            toast.error(err)
        }
    }

    const redeemGiftListHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${apis.redeemGiftList}${userId}`)
            // console.log("res", res)
            if (res?.data?.status === 200) {
                setLoading(false)
                setRedeemedGiftList(res?.data?.data)
            } else {
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            toast.error(err)
        }
    }
    useEffect(() => {
        if (userId) {
            redeemGiftListHandler()
        }
    }, [userId])
    return (
        <div className='mx-3 font-roboto'>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <div className='bg-inputBg text-sm text-lightGray rounded p-2 mt-60 pb-10'>
                <p className='text-gray'>Hi</p>
                <p className='text-gray'>We have a gift for you</p>
                <p className='text-black mt-5'>Please enter the gift code below</p>
                <input onChange={(e) => setGiftCode(e.target.value)} className='w-full outline-none bg-[#EBEBEB] rounded p-1 mt-3' type="text" placeholder='Please enter gift code' />
                <button onClick={redeemGift} className='bg-gradient-to-b from-red to-redLight text-white rounded-full w-full text-sm py-1.5 mt-5'>Receive</button>
            </div>
            <div className='mt-3'>
                <div className='flex mt-10 items-center gap-3  text-black '>
                    <img className='w-10 h-10' src={giftRedeemList} alt="sa" />
                    <h1 className='text-nowrap text-lg font-bold'>Gift Redeemed List</h1>
                </div>
                <table className='w-full mt-10'>
                    <thead>
                        <tr className='text-black font-bold'>
                            <th className='text-center'>Gift Code</th>
                            <th className='text-center'>Amount</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {redeemedGiftList?.length > 0 ? redeemedGiftList?.map((item, i) => (
                            <tr key={i} className='text-lightGray text-xsm bg-inputBg'>
                                <td className='text-center py-2'>{item?.gift_code}</td>
                                <td className='text-center' >{item?.amount}</td>
                                <td className='text-center'>{item?.status === 1 ? "Redeem" : "Yet to redeem"}</td>
                                <td className='text-center'>{moment(item?.created_at).format("DD-MM-YYYY")}</td>
                            </tr>
                        )) : <p className='' >no data</p>}

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ActivityGifts