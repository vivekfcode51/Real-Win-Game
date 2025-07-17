import React, { useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import password from "../../assets/icons/password.png"
import apis from '../../utils/apis';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Loader from '../../reusable_component/Loader/Loader';
function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState({
        login_password: false,
        new_password: false,
        password_confirmation: false,
    });
    const userId = localStorage.getItem("userId");
    const [allInputs, setAllInputs] = useState({
        login_password: "",
        new_password: "",
        password_confirmation: "",
    });

    const passwordHandler = async () => {
        setLoading(true)
        const payload = {
            userid: userId,
            password: allInputs?.login_password,
            newpassword: allInputs?.new_password,
            confirm_newpassword: allInputs?.password_confirmation
        }
        try {
            const res = await axios.post(apis.changePassword, payload)
            // console.log("res", res)
            if (res?.data?.status === "200") {
                setLoading(false)
                toast.success(res?.data?.message)
                setAllInputs({
                    login_password: "",
                    new_password: "",
                    password_confirmation: "",
                })
            } else {
                // console.log("4000", res)
                setLoading(false)
                toast.error(res?.data?.message)
            }
        } catch (err) {
            setLoading(false)
            console.log("errr", err)
            toast.error("Internal server error")
        }
    }

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleInputChange = (field, value) => {
        setAllInputs((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div>
            {loading && <Loader setLoading={setLoading} loading={loading} />}
            <div className="w-full text-gray rounded-lg p-6">
                {/* Login Password */}
                <div className="relative">
                    <div className="flex items-center py-2 gap-2">
                        <img src={password} alt="cf" className='w-6 h-6' />
                        <label htmlFor="login_password" className="text-sm ">
                            Login Password
                        </label>
                    </div>
                    <input
                        value={allInputs?.login_password}
                        onChange={(e) => handleInputChange("login_password", e.target.value)}
                        type={passwordVisibility.login_password ? "text" : "password"}
                        name="login_password"
                        id="login_password"
                        placeholder="Login Password"
                        className="bg-inputBg text-gray rounded-md outline-none block w-full p-3.5 dark:placeholder-gray dark:text-gray text-[15px]"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("login_password")}
                        className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center text-text dark:text-text"
                    >
                        {passwordVisibility.login_password ? <MdVisibilityOff className='text-gray opacity-35' size={20} /> : <MdVisibility className='text-gray opacity-35' size={20} />}
                    </button>
                </div>

                {/* New Password */}
                <div className="relative mt-5">
                    <div className="flex items-center py-2 gap-2">
                        <img src={password} alt="cf" className='w-6 h-6' />
                        <label htmlFor="new_password" className="text-sm ">
                            New login Password
                        </label>
                    </div>
                    <input
                        value={allInputs?.new_password}
                        onChange={(e) => handleInputChange("new_password", e.target.value)}
                        type={passwordVisibility.new_password ? "text" : "password"}
                        name="new_password"
                        id="new_password"
                        placeholder="New login Password"
                        className="bg-inputBg text-gray rounded-md outline-none block w-full p-3.5 dark:placeholder-gray dark:text-gray text-[15px]"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new_password")}
                        className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center text-text dark:text-text"
                    >
                        {passwordVisibility.new_password ? <MdVisibilityOff className='text-gray opacity-35' size={20} /> : <MdVisibility className='text-gray opacity-35' size={20} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mt-5">
                    <div className="flex items-center py-2 gap-2">
                        <img src={password} alt="cf" className='w-6 h-6' />
                        <label htmlFor="password_confirmation" className="text-sm ">
                            New Confirm Password
                        </label>
                    </div>
                    <input
                        value={allInputs?.password_confirmation}
                        onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
                        type={passwordVisibility.password_confirmation ? "text" : "password"}
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="New Confirm Password"
                        className="bg-inputBg text-gray rounded-md outline-none block w-full p-3.5 dark:placeholder-gray dark:text-gray text-[15px]"
                    />
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password_confirmation")}
                        className="absolute inset-y-0 right-0 top-8 pr-3 flex items-center text-text dark:text-text"
                    >
                        {passwordVisibility.password_confirmation ? <MdVisibilityOff className='text-gray opacity-35' size={20} /> : <MdVisibility className='text-gray opacity-35' size={20} />}
                    </button>
                </div>
                <Link to="/customerservices" >
                    <div className='mx-3 text-end flex items-center justify-end gap-2 mt-5 text-xsm'>
                        Contact customer services <FaGreaterThan size={12} />
                    </div>
                </Link>
                {/* Save Button */}
                <button onClick={passwordHandler} className="w-full mt-20 tracking-[2px] bg-gradient-to-b from-[#f95959] to-[#ff9a8e] text-white text-lg font-semibold py-2 rounded-full shadow-md ">
                    Save changes
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;
