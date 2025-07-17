import depo_wallet from "../../assets/icons/depo_wallet.png"
import bnous1 from "../../assets/usaAsset/activity/bonus1.png"
import Activitygift from "../../assets/icons/Activitygift.png"
import apis from '../../utils/apis';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../../reusable_component/Loader/Loader";
function ActivityAward() {
  const [loading, setLoading] = useState(false);
  const [awardData, setAwardData] = useState([])
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
  const activityAwardHandler = async () => {
    setLoading(true)
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis.activityRewards}${userId}`)
      if (res?.data?.status === 200) {
        setLoading(false)
        setAwardData(res?.data)
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
      activityAwardHandler()
    }
  }, [userId])

  const ClaimBonus = async (id, amount) => {
    setLoading(true)
    const payload = {
      userid: userId,
      amount,
      activity_id: id
    }
    // console.log("payloadpayload", payload)
    try {
      const res = await axios.post(apis.activityRewardsClaim, payload)
      // console.log("res", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        activityAwardHandler()
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
  // console.log("awardData", awardData)
  return (
    <div className='pb-10 font-roboto'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className='grid grid-cols-3 bg-gradient-to-l from-red to-redLight py-3 '>
        <div className='col-span-1'>
          <img
            src={Activitygift}
            alt="Gifts"
            className="w-full  object-cover rounded"
          />
        </div>
        <div className='col-span-2'>
          <h1 className='font-bold'>Activity Record</h1>
          <p className='text-xs'>Complete Weekly / Daily tasks to receive rich records.Weekly rewards can&apos;t be accumulated to the next week, and daily rewards cannot be accumulated to the next day.</p>
        </div>
      </div>
      {awardData?.data?.length > 0 ? awardData?.data?.map((item, i) => (
        <div key={i} className=' bg-inputBg mx-3  rounded-md mt-3'>
          <div className='flex items-center justify-between pr-2 border-b-[1px] border-border1 text-sm'>
            <button className='bg-green py-2 px-5 rounded-tl-md rounded-br-md capitalize'>{item?.name}</button>
            <p className=' text-gray text-sm'>{item?.status === "1" ? "Unfinished" : "Finished"}</p>
          </div>
          <div className='flex  items-center gap-2 mt-3 px-2'>
            <img className="w-7 h-7" src={bnous1} alt="d" />
            <p className='text-xsm text-gray'>Recharge Bonus</p>
            <p className='text-redLight text-sm'>0/{item?.range_amount}</p>
          </div>
          <div className="px-2">
            <div className='bg-[#e5e8f5] rounded-md text-xs text-[#888] p-2'>If your cumulative deposit reaches the maximum of 100,000 rupees on that day, you can claim the entire bonus</div>
          </div>
          <div className='flex items-center justify-between text-xs mx-2 border-b-[1px] border-border1 py-3'>
            <div className="text-gray ">Award Amount</div>
            <div className='flex items-center gap-2'>
              <img className='w-6 h-6' src={depo_wallet} alt="as" />
              <p className='text-gold'>₹{item?.amount}</p>
            </div>
          </div>
          <div className='mt-3 px-2'>
            <button onClick={() => ClaimBonus(item?.activity_id, item?.amount)} className='rounded-full border-redLight border-[1px] w-full py-0.5 text-redLight font-bold text-sm'>{item?.status === "1" ? "to complete" : "Completed"}</button>
          </div>
        </div>
      )) : <p className="text-black flex items-center justify-center mt-20">No data</p>}
    </div>
  )
}

export default ActivityAward