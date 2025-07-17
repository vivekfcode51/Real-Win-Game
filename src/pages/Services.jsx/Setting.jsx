/* eslint-disable no-unused-vars */
import { PiCopySimpleFill } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { IoMdLock } from 'react-icons/io'
import { TfiEmail } from 'react-icons/tfi'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import apis from '../../utils/apis'
import { toast } from 'react-toastify'
import Loader from '../../reusable_component/Loader/Loader'
function Setting() {
  const [loading, setLoading] = useState(false);
  const [nickNameModal, setNicknameModal] = useState(false)
  const [myDetails, setMyDetails] = useState(null)
  const [isUidCopied, setIsUidCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const profileDetails = async (userId) => {
    try {
      const res = await axios.get(`${apis.profile}${userId}`);
      if (res?.data?.success === 200) {
        setMyDetails(res?.data?.data)
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const changeNameHandler = async () => {
    setLoading(true)
    const payload={
      id:userId,
      name: editedName,
    }
    try {
      const res = await axios.post(`${apis.update_profile}`, payload);
      if (res?.data?.status === 200) {
        setLoading(false)
        toast.success("Nickname updated successfully!");
        setIsEditing(false);
        setNicknameModal(false)
        profileDetails(userId)
      }
    } catch (err) {
      setLoading(false)
      toast.error("Failed to update nickname.");
    }
  };

  useEffect(() => {
    if (userId) {
      profileDetails(userId);
    }
  }, [userId]);
  const handleCopyUID = () => {
    if (myDetails?.u_id) {
      navigator.clipboard
        .writeText(myDetails?.u_id)
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
  const cancelModal = () => {
    setNicknameModal(false)
    setIsEditing(false)
  }
  // console.log("isEditing",myDetails)
  return (
    <div className='bg-white'>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <div className='bg-gradient-to-l from-[#ff9a8e] to-[#f95959] rounded-b-3xl h-40
       w-full'>
      </div>
      <div className='bg-bg1 rounded-lg -mt-36 text-black mx-3 p-3'>
        <div className='flex items-center justify-between'>
          <img src={myDetails?.image} className='h-20 w-20 rounded-full' alt="ds" />
          <Link to="/changeavatar">  <p className='text-lightGray flex items-center'>Change Avatar <MdKeyboardArrowRight
            className='text-lightGray' size={28} /></p></Link>
        </div>
        <button onClick={() => setNicknameModal(true)} className='w-full flex mt-5 border-border1 border-b-[1px] pb-5 items-center justify-between text-xsm'>
          <p className='text-lightGray'>Nickname</p>
          <p className='flex items-center'>{myDetails?.name} <MdKeyboardArrowRight className='text-lightGray' size={28} /></p>
        </button>
        <div className='flex mt-5 pb-5 items-center justify-between text-xsm'>
          <p className='text-lightGray'>UID</p>
          <p className='flex items-center gap-2'>
            {myDetails?.u_id}
            <PiCopySimpleFill onClick={handleCopyUID} size={20} className='text-redLight' />
          </p>
        </div>
      </div>
      <div className='bg-white mt-5 py-10'>
        <div className='border-l-4 pl-3 mx-5 bg-white font-bold text-black border-redLight'>
          Security Information
        </div>
        <div className='mx-5 bg-white'>
          <button className='w-full mt-5'>
            <Link to="/changepassword" className='py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-black bg-white'>
              <div className='flex items-center gap-3'>
                <IoMdLock size={30} className='text-redLight' />
                <p>Login Password</p>
              </div>
              <p className='flex text-lightGray items-center gap-2'>
                Edit
                <MdKeyboardArrowRight
                  size={28} className='text-2xl' />
              </p>
            </Link>
          </button>
          <button className='w-full mt-10'>
            <Link to="#" className='pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-black bg-white'>
              <div className='flex items-center gap-3'>
                <TfiEmail size={20} className='text-redLight' />
                <p>Blind mailbox</p>
              </div>
              <p className='flex text-lightGray items-center gap-2'>
                to bind
                <MdKeyboardArrowRight
                  size={28} className='' />
              </p>
            </Link>
          </button>
          <button className='w-full mt-10'>
            <Link to="#" className='pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-black bg-white'>
              <div className='flex items-center gap-3'>
                <TfiEmail size={20} className='text-redLight' />
                <p>Google Verification</p>
              </div>
              <p className='flex text-lightGray items-center gap-2'>
                unopened
                <MdKeyboardArrowRight
                  size={28} className='' />
              </p>
            </Link>
          </button>
          <button className='w-full mt-10'>
            <Link to="#" className='pl-2 py-2 rounded-lg  w-full flex items-center justify-between gap-2 text-black bg-white'>
              <div className='flex items-center gap-3'>
                <TfiEmail size={20} className='text-redLight' />
                <p>Updated version</p>
              </div>
              <p className='flex text-lightGray items-center gap-2'>
                1.0.0
                <MdKeyboardArrowRight
                  size={28} className='' />
              </p>
            </Link>
          </button>

        </div>
      </div>
      {nickNameModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center ">
          <div className="h-96 w-[370px] bg-red p-2 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <div className='w-full flex items-center justify-center py-3 font-bold px-5'>
              <p className='bg-white h-0.5 w-7'></p> &nbsp;&nbsp;
              <p className='px-7'>Change Nickname</p>&nbsp;&nbsp;
              <p className='bg-white h-0.5 w-7'></p>
            </div>
            <div className='bg-white rounded-lg h-full pt-4 flex flex-col items-center justify-between w-full p-3'>
              <div className='w-full'>
                <div className='w-full flex gap-2 justify-start items-center'>
                  <CgProfile size={20} className='text-red' />
                  <p className='text-black'>Nickname</p>
                </div>
                <div className='text-black bg-inputBg rounded-full pl-6 mt-5 p-3 w-full'>
                  {!isEditing ? (
                    <div onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <p>{myDetails?.name}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                      autoFocus
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="bg-inputBg outline-none rounded px-2"
                      />
                    </div>
                  )}
                </div>
              </div>
              <button onClick={changeNameHandler}
                type="submit"
                className="mt-5 w-full font-bold py-2 rounded-full border-none bg-gradient-to-b from-[#f95959] to-[#ff9a8e] shadow-lg flex items-center justify-center"
              >
                Confirm
              </button>
            </div>
          </div>
          <div className=' text-black mt-2 border-[1px] h-7 w-7 border-lightGray rounded-full ' >
            <button className='p-0.5' onClick={cancelModal}><RxCross2 className='text-gray font-bold' size={20} />    </button>
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
    </div>
  )
}

export default Setting