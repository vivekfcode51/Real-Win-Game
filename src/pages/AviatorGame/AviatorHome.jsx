import AviatorHeader from './AviatorHeader'
import HeightListBar from './HeightListBar'
import AviatorFlight from './AviatorFlight'
import BetSection from './BetSection'
import AllBetsHome from './AllBetsHome'
import { useEffect, useState } from 'react'
import { IoCaretDownSharp, IoCaretUpSharp } from "react-icons/io5";
import { GrRefresh } from "react-icons/gr";
import axios from 'axios'
import { socket } from './AviatorSocket'
import { baseUrlUsaWin } from '../../utils/apis'

function AviatorHome() {
  const [isPathRemoved, setIsPathRemoved] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [changeBg, setChangeBg] = useState({modal:false,selectBg:false,image:""});
  const [openHeightListModal, setOpenHeightListModal] = useState(false)
  const [refreshHeightList, setRefreshHeightList] = useState(false)
  const [betApiHitted, setBetApiHitted] = useState({ cancel1: false, cancel2: false, bet1: false, bet2: false, cashout1: false, cashout2: false })
  const [btn, setBtn] = useState({ btn1: false, btn2: false })
  const [getData, setGetData] = useState(null)
  const [hotAirData, setHotAirData] = useState(null);
  useEffect(() => {
    const handleSocket = (hotair) => {
      const q = JSON.parse(hotair);
      // console.log("qqqqqqq",q)
      setHotAirData(q);
    };

    socket.on("upcolor_aviator", handleSocket);
    return () => socket.off("upcolor_aviator", handleSocket);
  }, []);
  const getPreviousResult = async () => {
    try {
      const res = await axios.get(`${baseUrlUsaWin}/api/aviator_last_five_result`)
      // console.log("first", res)
      console.log("API URL:", `${baseUrlUsaWin}/api/aviator_last_five_result`);
      
      if (res?.data?.status === 200 || res?.data?.status === "200") {
        setGetData(res?.data?.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setRefreshHeightList(false)
    }
  }
  // console.log("getData",hotAirData)
  useEffect(() => {
    getPreviousResult()
  }, [refreshHeightList])
  const colors = ["text-[#F85050]", "text-blue-500", "text-green", "text-yellow", "text-purple-500", "text-pink-500"];
  return (
    < >
      <AviatorHeader betApiHitted={betApiHitted} changeBg={changeBg} setChangeBg={setChangeBg} isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} isPathRemoved={isPathRemoved} setIsPathRemoved={setIsPathRemoved} />
      <div className=' w-full xl:flex text-black justify-center h-[calc(100%-3.22rem)] px-2 pt-2 gap-2'>
        <div className='order-2  xl:mt-0 h-[70vh] sm:h-[100%] w-full xl:w-[70vw] rounded-md '>
          <div className='h-[50%] lg:h-[67%]'>
            <div className='w-[99%] flex items-center gap-2'>
              <HeightListBar hotAirData={hotAirData} betApiHitted={betApiHitted} refreshHeightList={refreshHeightList} setRefreshHeightList={setRefreshHeightList} />
              <div className='flex items-center gap-2 border-gray border-[1px] bg-blackAviator2 px-2 py-0.5 rounded-full'>
                <button onClick={() => setRefreshHeightList(true)} className={`text-${openHeightListModal ? "[#F85050]" : "gray"}`}><GrRefresh size={20} /> </button>
                {openHeightListModal ? <button onClick={() => setOpenHeightListModal(false)} className='text-[#F85050]'><IoCaretDownSharp size={20} /> </button> :
                  <button onClick={() => setOpenHeightListModal(true)} className='text-gray'><IoCaretUpSharp size={20} /> </button>}
              </div>
            </div>
            <div className='w-[100%] text-xsm flex items-center justify-between text-gray'>
              <p> Round ID:{hotAirData?.period}</p>
              <p></p>
            </div>
            <div className='mt-2 bg-blackAviator2 rounded-2xl h-full'>
              <AviatorFlight changeBg={changeBg} setChangeBg={setChangeBg} isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} isPathRemoved={isPathRemoved} setIsPathRemoved={setIsPathRemoved} />
            </div>
          </div>
          <div className='pt-10 mt-6 h-[25%] md:h-[calc(100%-67%-24px)]'>
            <BetSection setBtn={setBtn} setBetApiHitted={setBetApiHitted} />
          </div>
        </div>
        <div className={`w-full ${btn.btn1 && btn.btn2
          ? "mt-[215px]"
          : btn.btn1 || btn.btn2
            ? "mt-[175px]"
            : "mt-[135px]"
          } sm:mt-[90px] lg:mt-2 xl:mt-0 order-1 xl:w-[30vw] h-full p-2 rounded-md bg-blackAviator2`}>
          <AllBetsHome betApiHitted={betApiHitted} />
        </div>
      </div>
      {openHeightListModal && (
        <div className="fixed inset-0 z-50 flex top-[6.5rem] justify-end">
          <div className="max-h-48 w-[350px] sm:w-[600px] bg-black bg-opacity-50 rounded-lg shadow-lg flex flex-col items-start justify-start overflow-y-auto p-2 text-white">
            Round History
            <div className='w-full flex flex-wrap gap-2 items-start justify-start mt-2'>
              {getData?.map((item, i) => (
                <div
                  key={i}
                  className={`bg-blackAviator2 rounded-full px-3 py-0.5 text-xsm ${colors[i % colors.length]}`}
                >
                  {item?.price}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AviatorHome
