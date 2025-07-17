import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import apis from '../../utils/apis';
import no_data_available from '../../assets/images/no_data_available.png';
import Loader from '../../reusable_component/Loader/Loader';

function AllTransactionsHistory() {
  const [loading, setLoading] = useState(false);
  const [modalFirst, handleModalFirst] = useState(false);
  const [modalFirstValue, handleModalFirstValue] = useState("All");
  const [modalSecond, handleModalSecond] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [transactionHistoryData, setTransactionHistoryData] = useState([]);
  const [confirmedDate, setConfirmedDate] = useState("");
  const modalRef = useRef(null);
  const modalSecondRef = useRef(null);


  const userId = localStorage.getItem("userId");

  const AllTransactionsHistoryListHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.transaction_history_list}`)
      if (res?.data?.status === 200) {
        setLoading(false)
        setTransactionList(res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        console.log(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const AllTransactionsHistoryDataHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${apis.transaction_history}${userId}`)
      // console.log("res,res", res)
      if (res?.data?.status === 200) {
        setLoading(false)
        setTransactionHistoryData(res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        console.log(res?.data?.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  const filteredTransactions = transactionHistoryData?.filter((item) => {
    const matchesType = modalFirstValue === "All" || modalFirstValue === item.type;
    const matchesDate = !confirmedDate || item?.datetime.startsWith(confirmedDate);
    return matchesType && matchesDate;
  });
  useEffect(() => {
    AllTransactionsHistoryListHandler()
    AllTransactionsHistoryDataHandler()
  }, [userId])
  // Generate dynamic year list

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
  // console.log("transactionList", transactionHistoryData)
  return (
    <div className='mx-3'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <button
          onClick={() => handleModalFirst(!modalFirst)}
          className="bg-inputBg text-black rounded-md text-xsm font-bold py-4 px-2 flex justify-between items-center shadow-md"
        >
          <p className='capitalize'>{modalFirstValue}</p>
          <p>
            <IoIosArrowDown size={18} />
          </p>
        </button>
        <button
          className="bg-inputBg text-black rounded-md text-xsm font-bold py-4 px-2 flex justify-center items-center shadow-md"
        >
          <input onChange={(e) => setConfirmedDate(e.target.value)} className='outline-none bg-inputBg' type="date" />
        </button>
      </div>
      <div className='bg-inputBg rounded-b-md'>
        {filteredTransactions && filteredTransactions.length > 0 ? (
          filteredTransactions.map((item, i) => (
            <div key={i}>
              <div className='capitalize bg-gradient-to-l from-redLight to-red w-full text-white p-2 rounded-t-md mt-5'>
                {item?.type}
              </div>
              <div className='text-xs text-black p-2 rounded-b-md'>
                <div className='flex items-center rounded-md justify-between px-2'>
                  <p>Detail</p>
                  <p
                    style={{
                      clipPath: 'polygon(1rem 0, 100% 0, 100% 100%, 1rem 100%, 0 100%)',
                    }}
                    className="bg-white py-1 px-5"
                  >
                    {item?.type}
                  </p>
                </div>
                <div className='mt-2 flex items-center rounded-md justify-between p-2'>
                  <p>Time</p>
                  <p
                    style={{
                      clipPath: 'polygon(1rem 0, 100% 0, 100% 100%, 1rem 100%, 0 100%)',
                    }}
                    className='bg-white py-1 px-5'
                  >
                    {item?.datetime}
                  </p>
                </div>
                <div className='mt-2 flex items-center rounded-md justify-between p-2'>
                  <p>Balance</p>
                  <p
                    style={{
                      clipPath: 'polygon(1rem 0, 100% 0, 100% 100%, 1rem 100%, 0 100%)',
                    }}
                    className='text-red bg-white text-lg font-bold px-5'
                  >
                    ₹{item?.amount}
                  </p>
                </div>
                <div className='w-full h-14 bg-white rounded-md'></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <img src={no_data_available} className='mt-20' alt="d" />
            <p className='text-black mt-10 bg-none text-center'>No data</p>
          </>
        )}
      </div>

      {/* modals */}
      {modalFirst && (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-3 rounded-t-xl h-[60%] pb-10 overflow-y-auto w-full xsm:w-[400px]"
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
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  handleModalFirstValue("All");
                  // handleModalFirst(false);
                }}
                className={`${modalFirstValue === "All" ? "text-black" : "text-gray"
                  }`}
              >
                All
              </button>
              {transactionList?.map((item, i) => {
                return (
                  <button
                    key={(i)}
                    onClick={() => {
                      handleModalFirstValue(item?.name);
                      // handleModalFirst(false);
                    }}
                    className={`capitalize ${modalFirstValue === item?.name ? "text-black" : "text-gray"
                      }`}
                  >
                    {item?.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default AllTransactionsHistory