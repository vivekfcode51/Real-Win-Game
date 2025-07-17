import { MdKeyboardArrowDown, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Link, useNavigate, useParams ,useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apis from '../utils/apis';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../reusable_component/Loader/Loader';
import phoneUsa from "../assets/usaAsset/phone.png"
import passwordUsa from "../assets/usaAsset/password.png"
import tikki from "../assets/usaAsset/tikki.png"
import inviteCode from "../assets/usaAsset/invitationCode.png"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdEmail } from "react-icons/md";

const register = apis?.register

function Register() {
  const [searchParams] = useSearchParams();
const { referralCode: paramReferralCode } = useParams();
  const [referralCode, setReferralCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // const validationSchema = Yup.object({
  //   mobile: Yup.string()
  //     .required('Phone number is required')
  //     .matches(/^[0-9]+$/, 'Phone number must be numeric')
  //     .min(10, 'Phone number must be at least 10 digits')
  //     .max(10, 'Phone number cannot exceed 10 digits'),
  //   password: Yup.string()
  //     .required('Password is required')
  //     .min(6, 'Password must be at least 8 characters')
  //     .matches(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and one number'), password_confirmation: Yup.string()
  //       .required('Confirm your password')
  //       .oneOf([Yup.ref('password')], 'Passwords must match')
  //       .min(6, 'Password confirmation must be at least 6 characters')
  //       .matches(/^(?=.*[A-Za-z])(?=.*\d)/, 'Password must contain at least one letter and one number'),
  //   // referral_code: Yup.string().required(),
  // });

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number cannot exceed 10 digits"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number and be alphanumeric"
      ),

    password_confirmation: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .min(6, "Password confirmation must be at least 6 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain at least one letter and one number and be alphanumeric"
      ),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    // referral_code: Yup.string().optional(), // optional if needed
  });
  
  const formik = useFormik({
    initialValues: {
      mobile: "",
      country_code: selectedCountryCode,
      email: "", // ✅ new field
      password: "",
      password_confirmation: "",
      referral_code: referralCode,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!checkAgreement) {
        toast.warn("Please check Privacy Agreement");
        return;
      }
      // console.log("values",values)
      setLoading(true);
      try {
        const res = await axios.post(register, values, {
          headers: { "Content-Type": "application/json" },
        });
        // console.log("resresres", res)
        if (res?.data?.status === 200) {
          localStorage.setItem("userId", res?.data?.data?.userId);
          navigate("/");
          toast.success("You have been registered successfully");
        } else {
          toast.error(res?.data?.message);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
  });
useEffect(() => {
  if (paramReferralCode) {
    setReferralCode(paramReferralCode);
    formik.setFieldValue('referral_code', paramReferralCode);
  } else {
    const code = searchParams.get("referral");
    if (code) {
      setReferralCode(code);
      formik.setFieldValue('referral_code', code);
    }
  }
  formik.setFieldValue('country_code', selectedCountryCode);
}, [searchParams, selectedCountryCode, paramReferralCode]);

  const countryCodeHandler = async () => {
    try {
      const res = await axios.post(apis.country)
      // console.log("res", res)
      if (res?.data?.status === "success") {
        setCountryCodeData(res?.data?.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleSelectCountry = (code) => {
    setSelectedCountryCode(code);
    setIsModalOpen(false);
  };

  useEffect(() => {
    countryCodeHandler()
  }, [])
  const naivatorhandle = () => {
    localStorage.setItem("abousType", "6")
  }
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <section className=" w-full flex flex-col items-start dark:text-gray">
        <div className="bg-gradient-to-l from-red to-redLight w-full">
          <div className=" text-white pb-5">
            <h1 className="text-sm px-5 font-bold mt-2">Register</h1>
            <p className="text-[10px] px-5 my-2">
              Please register with your phone number or email{" "}
            </p>
          </div>
        </div>
        <div className="bg-white px-5 flex flex-col h-full w-full  items-center justify-center mx-auto lg:py-0">
          <div className="flex  flex-col items-center justify-center w-full py-2 border-b-2 mx-5 text-redLight border-redLight">
            <div>
              <img className="w-4 h-6" src={phoneUsa} alt="sd" />
            </div>
            <div className="text-sm mt-2">Register your phone</div>
          </div>
          <div className="w-full h-full text-white">
            <form
              className="space-y-4 w-full md:space-y-6 my-5"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <div className=" flex items-center gap-2 py-2">
                  <div>
                    <img className="w-4 h-6" src={phoneUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="mobile"
                    className=" text-sm text-gray font-medium"
                  >
                    Phone number
                  </label>
                </div>

                <div className="relative flex items-center gap-2 mt-2">
                  <p
                    className="bg-inputBg h-[44px] w-[30%] text-gray p-3 flex items-center justify-center rounded-md cursor-pointer"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    {selectedCountryCode} <MdKeyboardArrowDown size={20} />
                  </p>
                  {isModalOpen && (
                    <div className="absolute left-0 top-12 h-48 overflow-auto w-full bg-white shadow-lg border rounded-md z-10">
                      {countryCodeData
                        ?.sort((a, b) =>
                          a.phone_code === "+91"
                            ? -1
                            : b.phone_code === "+91"
                            ? 1
                            : 0
                        )
                        .map((item, i) => (
                          <p
                            key={i}
                            className={`p-2 cursor-pointer text-blackLight ${
                              selectedCountryCode === item?.phone_code
                                ? "bg-red text-white"
                                : ""
                            }`}
                            onClick={() =>
                              handleSelectCountry(item?.phone_code)
                            }
                          >
                            {item?.phone_code} - {item?.name}
                          </p>
                        ))}
                    </div>
                  )}
                  <input
                    {...formik.getFieldProps("mobile")}
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="\d{10}"
                    name="mobile"
                    placeholder="Enter your phone number"
                    className="no-spinner col-span-[60%] bg-inputBg text-[14px] focus:border-[1px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      formik.setFieldValue("mobile", e.target.value);
                    }}
                  />
                </div>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="text-red text-xs">{formik.errors.mobile}</div>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center py-2 gap-2">
                  <div>
                    <MdEmail size={24} color="red" />
                  </div>
                  <label
                    htmlFor="email"
                    className="text-sm text-gray font-medium"
                  >
                    Email
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="bg-inputBg mt-2 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red text-xs">{formik.errors.email}</div>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center py-2 gap-2">
                  <div>
                    <img className="w-6 h-6" src={passwordUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="password"
                    className="text-sm text-gray font-medium"
                  >
                    New Password
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("password")}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-inputBg mt-2 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray "
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
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility
                      className="dark:text-gray opacity-65"
                      size={20}
                    />
                  )}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red text-xs">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="flex items-center py-2 gap-2">
                  <div>
                    <img className="w-6 h-6" src={passwordUsa} alt="sd" />
                  </div>
                  <label
                    htmlFor="password_confirmation"
                    className="text-sm text-gray font-medium"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("password_confirmation")}
                  type={passwordVisible ? "text" : "password"}
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="Confirm Password"
                  className="bg-inputBg mt-2 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
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
                  {passwordVisible ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility
                      className="dark:text-gray opacity-65"
                      size={20}
                    />
                  )}
                </button>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <div className="text-red text-xs">
                      {formik.errors.password_confirmation}
                    </div>
                  )}
              </div>
              <div className="">
                <div className="flex items-center gap-2 py-2">
                  <div>
                    <img className="w-6 h-6" src={inviteCode} alt="sd" />
                  </div>
                  <label
                    htmlFor="referral_code"
                    className="text-sm text-gray font-medium"
                  >
                    {" "}
                    Invite Code
                  </label>
                </div>
                <input
                  {...formik.getFieldProps("referral_code")}
                  type="text"
                  name="referral_code"
                  id="referral_code"
                  placeholder="Please enter the invitation code"
                  className="bg-inputBg mt-2 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <div
                  onClick={() => setCheckAgreement(!checkAgreement)}
                  className={`flex w-6 h-6 items-center cursor-pointer rounded-full ${
                    checkAgreement
                      ? "text-lightGray bg-white "
                      : "text-chocolate"
                  }`}
                >
                  {checkAgreement ? (
                    <img className="w-5 h-5" src={tikki} alt="df" />
                  ) : (
                    <div className="border-[1px] border-[#c8c9cc] p-2 rounded-full"></div>
                  )}
                </div>
                <label
                  htmlFor="agree"
                  className="text-gray ml-0 text-xs sm:text-base md:text-xs"
                >
                  I have read and agree{" "}
                </label>
                <a
                  onClick={naivatorhandle}
                  href="/aboutus/child"
                  className="ml-2 text-redLight underline text-xs sm:text-base md:text-xs"
                >
                  Privacy Agreement
                </a>
              </div>
              <div className="flex flex-col w-full font-bold items-center justify-center">
                <button
                  type="submit"
                  className="w-[90%] font-bold tracking-[0.20333rem] py-2.5 rounded-full border-none bg-gradient-to-b from-red to-redLight shadow-lg flex items-center justify-center"
                >
                  Register
                </button>
                <p className="border w-[90%] text-xs border-redLight mt-5 tracking-[2px] text-gray rounded-full p-2 flex gap-2 items-center justify-center">
                  I have an account{" "}
                  <Link
                    to="/login"
                    className="font-bold text-sm hover:underline text-redLight tracking-[0.20333rem] "
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
