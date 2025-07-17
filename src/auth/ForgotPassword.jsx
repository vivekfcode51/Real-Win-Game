import { MdKeyboardArrowDown, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Loader from '../reusable_component/Loader/Loader';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import loginPhone from "../assets/icons/loginPhone.png"
import phoneUsa from "../assets/icons/phoneUsa.png"
import passwordUsa from "../assets/icons/passwordUsa.png"
import { useState } from 'react';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [checkAgreement, setCheckAgreement] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [allInputs, setAllInputs] = useState({
        mobile: "",
        otp: "",
        userid: "",
        email: "",
        password: "",
        password_confirmation: "",
        referral_code: "",
    });
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        <>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <section className=" w-full flex flex-col items-start dark:text-gray">
                <div className="bg-gradient-to-l from-red to-redLight w-full">
                    <div className=" text-white pb-5">
                        <h1 className="text-sm px-5 font-bold mt-2">Forgot password</h1>
                        <p className="text-[10px] px-5 my-2">Please retrieve / change your password through your mobile phone number or email. </p>
                    </div>
                </div>
                <div className="bg-bg1 px-5 flex flex-col h-full w-full  items-center justify-center mx-auto lg:py-0">
                    <div className="flex flex-col items-center justify-center w-full py-2 border-b-2 mx-5 text-bg2 border-bg2" >
                        <div>
                            <img className='w-6 h-6' src={loginPhone} alt="sd" />
                        </div>
                        <div className="text-sm mt-2"> Phone reset </div>
                    </div>
                    <div className="w-full h-full text-white">
                        <form className="space-y-4 w-full md:space-y-6 my-5" action="#">
                            <div className="w-full">
                                <div className=' flex items-center py-2 gap-x-[2px]'>
                                    <div>
                                        <img className='w-5 h-5' src={phoneUsa} alt="sd" />
                                    </div>
                                    <label htmlFor="mobile" className=" text-[14px] text-gray font-medium">Phone number</label>
                                </div>
                                <div className='flex items-center w-full gap-1'>
                                    <p className='bg-slate-100 w-[30%] text-gray p-2.5 flex items-center rounded-md'>+91 <MdKeyboardArrowDown size={20} />
                                    </p>
                                    <input
                                        value={allInputs.mobile}
                                        onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,10}$/.test(value)) {
                                            setAllInputs({
                                            ...allInputs,
                                            mobile: value,
                                            });
                                        }
                                        }}
                                        // onChange={(e) => {
                                        //     setAllInputs({
                                        //         ...allInputs,
                                        //         mobile: e.target.value,
                                        //     });
                                        // }}
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        
                                        placeholder="Enter your phone number"
                                        className={`col-span-[60%] bg-slate-100 text-[14px] focus:border-[1px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray`}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className='flex items-center py-2 gap-x-[2px]'>
                                    <div>
                                        <img className='w-5 h-5' src={passwordUsa} alt="sd" />
                                    </div>
                                    <label htmlFor="password" className="text-[14px] text-gray font-medium">New Password</label>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setAllInputs({
                                            ...allInputs,
                                            password: e.target.value,
                                        });
                                    }}
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    placeholder="New password"
                                    className="bg-slate-100 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray "
                                    onInput={(e) => {
                                        // Only allow alphanumeric characters (letters and numbers)
                                        e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                                        formik.setFieldValue("password", e.target.value);
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center text-gray opacity-25"
                                >
                                    {passwordVisible ? <MdVisibilityOff size={20} /> : <MdVisibility className='dark:text-gray opacity-65' size={20} />}
                                </button>
                            </div>
                            <div className="relative">
                                <div className='flex items-center py-2 gap-x-[2px]'>
                                    <div>
                                        <img className='w-5 h-5' src={passwordUsa} alt="sd" />
                                    </div>
                                    <label htmlFor="password_confirmation" className="text-[14px] text-gray font-medium">Confirm Password</label>
                                </div>
                                <input
                                    onChange={(e) => {
                                        setAllInputs({
                                            ...allInputs,
                                            password_confirmation: e.target.value,
                                        });
                                    }}
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    placeholder="Confirm new password"
                                    className="bg-slate-100 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray"
                                    onInput={(e) => {
                                        // Only allow alphanumeric characters (letters and numbers)
                                        e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                                        formik.setFieldValue("password_confirmation", e.target.value);
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 top-10 pr-3 flex items-center dark:text-gray opacity-35"
                                >
                                    {passwordVisible ? <MdVisibilityOff size={20} /> : <MdVisibility className='dark:text-gray opacity-65' size={20} />}
                                </button>
                            </div>
                            <div className="">
                                <div className="flex items-center gap-x-[2px] py-2">
                                    <div>
                                        <img className='w-5 h-5' src={passwordUsa} alt="sd" />
                                    </div>
                                    <label htmlFor="referral_code" className="text-[14px] text-gray font-medium"> Verification Code</label>
                                </div>
                                <div className='flex flex-col items-center gap-2'>
                                    <input
                                        type="text"
                                        name="confirmation_code"
                                        id="confirmation_code"
                                        placeholder="Please enter the confirmation code"
                                        value={allInputs.referral_code}
                                        onChange={(e) => setAllInputs({ ...allInputs, referral_code: e.target.value })}
                                        className="bg-slate-100 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-2.5 placeholder:text-gray text-gray"
                                    />
                                    <button type="submit" className="w-[90%] px-8 py-[10px] text-[1rem] rounded-full border-none bg-gradient-to-b from-red to-redLight shadow-lg flex items-center justify-center">Send</button>
                                </div>
                            </div>
                            <div className="flex items-center mt-4">
                                <div onClick={() => setCheckAgreement(!checkAgreement)} className={`flex items-center cursor-pointer rounded-full ${checkAgreement ? "text-chocolate bg-white " : "text-chocolate"}`}>
                                    {checkAgreement ? (
                                        <FaCheckCircle size={20} />
                                    ) : (
                                        <FaRegCircle size={20} />
                                    )}
                                </div>
                                <label htmlFor="agree" className="text-gray ml-2 text-xs sm:text-base md:text-xs">I have read and agree </label>
                                <a href="/aboutus/risk" className="ml-2 text-red underline text-xs sm:text-base md:text-xs">Privacy Agreement</a>
                            </div>
                            <div className='flex flex-col w-full font-bold items-center justify-center'>
                                <button type="submit" className="w-[90%] font-bold tracking-[0.20333rem] py-[8px] rounded-full border-none 
                                  bg-gradient-to-b from-red to-redLight shadow-lg flex items-center justify-center">Reset</button>

                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword