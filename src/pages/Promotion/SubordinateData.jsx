import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
import axios from 'axios'
import apis from "../../utils/apis"
import { useNavigate } from 'react-router-dom'
import { FaRegCopy } from 'react-icons/fa'
import no_data_available from "../../assets/images/no_data_available.png"
import Loader from '../../reusable_component/Loader/Loader'

function SubordinateData() {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null);
  const [modalFirstValue, handleModalFirstValue] = useState(0);
  const [confirmedDate, setConfirmedDate] = useState("Select date");
  const [modalFirst, handleModalFirst] = useState(false);
  const [tier, setTier] = useState(null);
  const [suboridnateData, setSuborinateData] = useState(null);
  const modalRef = useRef(null);

  const [copyUid, setCopyUid] = useState(null)
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()
  // const profileDetails = async () => {
  //   if (!userId) {
  //     toast.error("User not logged in");
  //     navigate("/login");
  //     return;
  //   }
  //   try {
  //     const res = await axios.get(`${apis?.profile}${userId}`);
  //     if (res?.data?.success === 200) {
  //       setMyDetails(res?.data)
  //     }
  //   } catch (err) {
  //     toast.error(err);
  //   }
  // };
  const tierHandler = async () => {
    setLoading(true)
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.get(`${apis.tier}`);
      // console.log("res1",res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setTier(res?.data?.data)
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err);
    }
  };
  const subOrdinateDataHandler = async () => {
    setLoading(true)
    if (!userId) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }
    const payload = {
      id: userId,
      tier: modalFirstValue,
      u_id:uid,
      created_at:confirmedDate
    }
    // console.log("payload",payload)
    try {
      const res = await axios.post(`${apis?.subordinateData}`, payload);
      // console.log("res1", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setSuborinateData(res?.data?.data)
      } else {
        setLoading(false)
        toast.error(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      toast.error(err);
    }
  };
  useEffect(() => {
    if (userId) {
      subOrdinateDataHandler();
    }
  }, [userId, modalFirstValue,confirmedDate]);

  useEffect(() => {
    tierHandler()
  }, [])

  const handleCopyUID = () => {
    if (suboridnateData?.subordinates_data[0]?.u_id) {
      navigator.clipboard
        .writeText(suboridnateData?.subordinates_data[0]?.u_id)
        .then(() => {
          setCopyUid(true)
        })
        .catch(() => {
          toast.error('Failed to copy UID.');
        });
    } else {
      toast.error('UID is not available.');
    }
  };
  useEffect(() => {
    if (copyUid) {
      handleCopyUID()
        const timer = setTimeout(() => {
            setCopyUid(false);
        }, 2000);
        return () => clearTimeout(timer);
    }
}, [copyUid, setCopyUid]);
// console.log("suboridnateData",tier)
  return (
    <div className='p-2 h-full w-full'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className='w-full flex items-center justify-between bg-white rounded-md p-2'>
        <input onChange={(e)=>setUid(e.target.value)} placeholder='search subordinate UID' className='bg-white text-[15px] text-black outline-none' type="text" name="" id="" />
        <div onClick={subOrdinateDataHandler} className='bg-red rounded-3xl px-5 py-0.5'> <IoSearchOutline className='text-white' size={30} /> </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={() => handleModalFirst(!modalFirst)}
          className="bg-white text-black rounded-md text-xsm  py-4 px-2 flex justify-between items-center shadow-md"
        >
          <p>{modalFirstValue === 0 ? "All" : modalFirstValue === 1 ? "Tier 1" : modalFirstValue === 2 ? "Tier 2" : modalFirstValue === 3 ? "Tier 3" : modalFirstValue === 4 ? "Tier 4" : modalFirstValue === 5 ? "Tier 5" : modalFirstValue === 9 ? "Tier 6" : ""}</p>
          <p>
            <IoIosArrowDown size={18} />
          </p>
        </button>
        <button
          className="bg-white text-black rounded-md text-xsm  py-4 px-2 flex justify-center items-center shadow-md"
        >
          <input value={confirmedDate} onChange={(e) => setConfirmedDate(e.target.value)} className='outline-none' type="date" />
        </button>
      </div>
      <div className='bg-red rounded-lg'>
        <div className='grid grid-cols-2 w-full p-2  mt-3 text-xsm'>
          <div className='col-span-1 flex flex-col items-center border-r-[1px] border-lightGray'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.number_of_deposit}</p>
            <p className='text-white'>Deposit number</p>
          </div>
          <div className='col-span-1 flex flex-col items-center'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.payin_amount ? Number(suboridnateData.payin_amount).toFixed(2) : "0"}</p>
            <p className='text-white'>Deposit amount</p>
          </div>
        </div>
        <div className='grid grid-cols-2 w-full p-2  mt-3 text-xsm'>
          <div className='col-span-1 flex flex-col items-center border-r-[1px] border-lightGray'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.number_of_bettor ? Number(suboridnateData.number_of_bettor).toFixed(2) : "0"}</p>
            <p className='text-white'>Number of bettors</p>
          </div>
          <div className='col-span-1 flex flex-col items-center'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.bet_amount ? Number(suboridnateData.bet_amount).toFixed(2) : "0"}</p>
            <p className='text-white'>Total bet</p>
          </div>
        </div>
        <div className='grid grid-cols-2 w-full p-2  mt-3 text-xsm'>
          <div className='col-span-1 flex flex-col items-center border-r-[1px] border-lightGray'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.first_deposit ? Number(suboridnateData.first_deposit).toFixed(2) : "0"}</p>
            <p className='text-white text-center'>Number of people making first deposit</p>
          </div>
          <div className='col-span-1 flex flex-col items-center'>
            <p className='text-white text-sm font-bold'>{suboridnateData?.first_deposit_amount ? Number(suboridnateData.first_deposit_amount).toFixed(2) : "0"}</p>
            <p className='text-white'>First deposit amount</p>
          </div>
        </div>
      </div>

      <div className=' mt-5  text-blackLight'>
        {suboridnateData?.subordinates_data?.length > 0 ? suboridnateData?.subordinates_data?.map((item, i) => (
          <div key={i} className="bg-inputBg rounded-lg py-2 px-2">
            <p className='py-4 border-b border1 '>UID: {item?.u_id}  <button onClick={handleCopyUID}> <FaRegCopy /></button></p>
            <div className='flex text-xsm items-center justify-between'>
              <div>
                <p className='py-1.5'>Level</p>
                <p className='py-1.5'>Bet amount</p>
                <p className='py-1.5'>Deposit amount</p>
                <p className='py-1.5'>Commission</p>
              </div>

              <div >
                <p className='py-1.5'>{item?.level}</p>
                <p className='py-1.5'>{item?.bet_amount}</p>
                <p className='py-1.5'>{item?.payin_amount}</p>
                <p className='py-1.5'>{item?.commission}</p>
              </div>
            </div>
          </div>
        )) :
          <div>
            <img src={no_data_available} alt="ds" />
            <p className='text-black w-full text-center'>No data</p>
          </div>
        }
      </div>

      {/*  modal  */}
      {modalFirst && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-3 rounded-t-xl h-auto w-full xsm:w-[400px]"
          >
            <div className='flex items-center justify-between'>

              <button
                onClick={() => handleModalFirst(false)}
                className="text-gray"
              >
                Cancel
              </button>
              <button
                onClick={() => handleModalFirst(false)}
                className="text-red"
              >
                Confirm
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-20">
              <button
                onClick={() => {
                  handleModalFirstValue(0);
                  // handleModalFirst(false);
                }}
                className={`border-b-[1px] border-border1 py-2 ${modalFirstValue === 0 ? "text-black" : "text-lightGray"
                  }`}
              >
                All
              </button>
              {tier?.length > 0 ? (tier?.map((item) => {
                // console.log("item",item)
                return (
                  <button
                    key={item?.id}
                    onClick={() => {
                      handleModalFirstValue(item?.id);
                      // handleModalFirst(false);
                    }}
                    className={`border-b-[1px] border-border1 py-2 ${modalFirstValue === item?.id ? "text-black" : "text-lightGray"
                      }`}
                  >
                    {item?.name}
                  </button>
                )
              })) : <p>No data found</p>}

            </div>
          </div>
        </div>
      )}
      {copyUid && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="h-14 w-[300px] bg-black opacity-70 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <p>Copy successfull</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubordinateData