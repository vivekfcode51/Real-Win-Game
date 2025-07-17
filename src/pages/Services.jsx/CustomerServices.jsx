import { Link } from 'react-router-dom'
import customerBg from '../../assets/images/customerBg.png'
// import email_tab from '../../assets/icons/email_tab.png'
import { MdKeyboardArrowRight } from 'react-icons/md'
// import { BiLogoTelegram } from 'react-icons/bi'
import axios from 'axios'
import apis from '../../utils/apis'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../reusable_component/Loader/Loader'

function CustomerServices() {
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState([])
  const handlerNavigator = (linkUrl) => {
    window.open(linkUrl, "_blank")
  }
  const handleEmailClick = () => {
    window.location.href = "mailto:someone@example.com?subject=Subject&body=Body%20text";
  };
  const serviceDataHandler = async () => {
    setLoading(true)
    try {
      const res = await axios.get(apis.customer_service)
      if (res?.data?.status === 200) {
        setLoading(false)
        setServiceData(res?.data?.data)
      } else if (res?.data?.status === 400) {
        setLoading(false)
        toast.error(res?.data?.message)
      }

    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }
  useEffect(() => {
    serviceDataHandler()
  }, [])
  return (
    <div>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className='bg-gradient-to-l from-[#f95959] to-[#ff9a8e]'><img src={customerBg} alt="ds" /></div>
      <div className='mt-5 px-5 flex items-center justify-between w-full font-bold text-black'>
        <p>Self Service</p>
        <button  onClick={() => handlerNavigator(serviceData[0]?.link)} className='px-3 py-1.5 text-xsm rounded-full border-none bg-gradient-to-b from-[#f95959] to-[#ff9a8e] shadow-lg flex items-center justify-center text-white'>My Issue</button>
      </div>
      <div className=' text-xsm px-5'>
        {serviceData?.map((item, i) => (
          <button onClick={() => handlerNavigator(item?.link)} key={i} className=' py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-gray bg-white mt-5 border-b-[1px] pb-2 border-gray'>
            <div className='flex items-center gap-2'>

              <div className='rounded-full w-10 h-10 text-white p-1 flex items-center justify-center'>
                <img src={item?.Image} alt="sd" />
              </div>
              <p>{item?.name}</p>
            </div>
            <p className='flex items-center gap-2'>
              <MdKeyboardArrowRight
                size={28} className='text-2xl' />
            </p>
          </button>
        ))}

      </div>
    </div>
  )
}

export default CustomerServices