import { RiDeleteBinLine } from 'react-icons/ri'
import pro_notification from "../../assets/icons/pro_notification.png"
function Notifications() {
  return (
    <div className='px-1'>
      <div className='bg-bg2 shadow-lg rounded-md mt-3 p-2'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2'>
            <img src={pro_notification} alt="sdf" />
          </div>
          <div className='col-span-8 flex items-center font-semibold text-gray'>Notification</div>
          <div className='col-span-2 flex items-center justify-end'><RiDeleteBinLine className='text-bg3' size={25} />
          </div>
        </div>
        <p className='text-xs'>Welcome to the UP Color:</p>
        <p className='text-xs'>Get ready to immerse yourself in a colorfull predeiction game expereince like before.</p>
      </div>
      <div className='bg-bg2 shadow-lg rounded-md mt-2 p-2'>
        <div className='grid grid-cols-12'>
          <div className='col-span-2'>
            <img src={pro_notification} alt="sdf" />
          </div>
          <div className='col-span-8 flex items-center font-semibold text-gray'>UP Color Win</div>
          <div className='col-span-2 flex items-center justify-end'><RiDeleteBinLine className='text-bg3' size={25} />
          </div>
        </div>
        <p className='text-xs'>UP Color Win</p>
      </div>
    </div>
  )
}

export default Notifications