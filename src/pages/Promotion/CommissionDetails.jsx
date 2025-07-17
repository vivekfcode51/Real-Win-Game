import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import apis from "../../utils/apis"
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Loader from '../../reusable_component/Loader/Loader'
function CommissionDetails() {
  const [loading, setLoading] = useState(false);
  const [confirmedDate, setConfirmedDate] = useState("Select date");
  const [commisionData, setCommisionData] = useState(null)
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()
  const comHandler = async () => {
    setLoading(true)
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis.commisionDetails}${userId}&type_id=${9}`)
      // console.log("res", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setCommisionData(res?.data?.data)
      } else {
        setLoading(false)
        toast?.error(res?.data?.message)
      }
      // const res1 = await axios.get(`${apis.commisionDetails}${userId}&type_id=${9}`)
    } catch (err) {
      setLoading(false)
      toast.error(err)
    }
  }
  console.log("commisionData",commisionData)
  useEffect(() => {
    comHandler()
  }, [userId])
  return (
    <div className='w-full h-full p-2'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <button
        className="bg-white text-lightGray rounded-md text-xs  py-2.5  px-2 flex justify-center items-center shadow-md"
      >
        <input onChange={(e) => setConfirmedDate(e.target.value)} className='outline-none' type="date" />
      </button>
      {commisionData?.length > 0 ? commisionData?.filter((item) => {

        if (confirmedDate !== "Select date" && !item?.settlement_date.startsWith(confirmedDate)) {
          return ;
        }
        return true;
      })?.map((item, i) => (
        <div key={i} className='bg-inputBg px-2 py-3 text-xs text-black mt-3'>
          <p>Settlement successful</p>
          <p>{moment(item?.settlement_date).format("DD-MM-YYYY HH:mm:ss")}</p>
          <p>The commission has been automatically credited to your balance </p>
          <div className='mt-3 bg-white p-2 rounded-md flex items-center justify-between'>
            <p>Number of bettors</p>
            <p className='text-black font-semibold'>{item?.number_of_bettors ? item?.number_of_bettors : "0"} People</p>
          </div>
          <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
            <p>Bet amount</p>
            <p className='text-black font-semibold'>{item?.bet_amount}</p>
          </div>
          <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
            <p>commission payout</p>
            <p className='text-black font-semibold'>{item?.commission_payout}</p>
          </div>
          <div className='mt-2 bg-white p-2 rounded-md flex items-center justify-between'>
            <p>Date</p>
            <p className='text-black font-semibold'>{moment(item?.settlement_date).format("DD-MM-YYYY HH:mm:ss")}</p>
          </div>
        </div>
      )) : <p className='text-black'>no data</p>}
    </div>
  )
}

export default CommissionDetails