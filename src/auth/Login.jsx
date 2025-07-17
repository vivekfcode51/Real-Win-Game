import {
  MdKeyboardArrowDown,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apis from "../utils/apis";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../reusable_component/Loader/Loader";
import phoneUsa from "../assets/usaAsset/phone.png";
import passwordUsa from "../assets/usaAsset/password.png";
import tikki from "../assets/usaAsset/tikki.png";
import cutomerService from "../assets/usaAsset/custoservice.png";
import forgetPassword from "../assets/usaAsset/forget_pass.png";
const loginEndpoint = apis?.login;

function Login() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checkAgreement, setCheckAgreement] = useState(false);
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   if (/^\d{0,10}$/.test(value)) {
  //   setFormData({ ...formData, [name]: value });
  // }
  //   // setFormData({ ...formData, [name]: value });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      // Mobile: Only numbers (0-9)
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "password") {
      // Password: Only letters (a-z, A-Z) and numbers (0-9)
      if (/^[A-Za-z0-9]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      // For other fields, allow everything
      setFormData({ ...formData, [name]: value });
    }
  };

  const MyProfileFn = async (userid) => {
    // const loginTokenFromLocalStorage = localStorage.getItem("login_token");
    try {
      const response = await axios.get(`${apis.profile}${userid}`);
      // console.log("ereseresresres",response)
      // const profileToken = response?.data?.data?.login_token;
      if (response?.data?.success === 423) {
        // console.log("blocked")
        toast.error("Blocked by admin");
      } else {
        localStorage.setItem("userId", userid);
        setLoading(false);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      toast.error("Blocked by admin");
    }
  };

  const generateToken = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = generateToken();
    try {
      const payload = {
        identity: formData.mobile,
        country_code: selectedCountryCode,
        password: formData.password,
        login_token: token,
      };
      // console.log("payload",payload)
      const response = await axios.post(loginEndpoint, payload);
      // console.log("resresrers", response);
      if (response?.data?.status === 200 || response?.data?.status === "200") {
        localStorage.setItem("login_token", token);
        await MyProfileFn(response?.data?.id);
      } else {
        toast.error(response?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if(err?.response?.data?.status===500||err?.response?.data?.status==="500"){
        toast.error("Something went wrong")
      }else{
        toast.error(err?.response?.data?.message)
      }
    }
  };

  const countryCodeHandler = async () => {
    try {
      const res = await axios.post(apis.country);
      // console.log("res", res)
      if (res?.data?.status === "success") {
        setCountryCodeData(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSelectCountry = (code) => {
    setSelectedCountryCode(code);
    setIsModalOpen(false);
  };

  useEffect(() => {
    countryCodeHandler();
  }, []);
  return (
    <>
      {loading && <Loader setLoading={setLoading} loading={loading} />}
      <section className="h-[100vh] font-inter w-full flex  flex-col items-start dark:text-white">
        <div className="bg-gradient-to-l from-red to-redLight w-full pb-5">
          <h1 className="text-sm font-bold font-inter px-10 mt-2">Log in</h1>
          <p className="text-[10px] px-10 mt-2">
            Please login with your phone number or email{" "}
          </p>
          <p className="text-[10px] px-10">
            If you forget your password ,please contact customer service{" "}
          </p>
        </div>
        <div className="flex flex-col w-full items-center justify-center px-5 lg:py-0">
          <div className="bg-bg1 w-full  text-white">
            <div className="flex  flex-col items-center justify-center w-full py-2 border-b-2 text-redLight border-redLight">
              <div>
                <img className="w-4 h-6" src={phoneUsa} alt="sd" />
              </div>
              <div className="text-sm mt-2">Log in with phone</div>
            </div>
            <form
              className="space-y-4 md:space-y-6 mt-3"
              onSubmit={handleLogin}
            >
              <div className="">
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
                <div className="relative flex items-center gap-2 ju">
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
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Please enter the phone number"
                    className="col-span-[60%] bg-inputBg text-[14px] focus:border-[1px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
                    value={formData.mobile}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        handleInputChange(e);
                      }
                    }}
                    required
                    maxLength={10}
                  />
                </div>
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
                    {" "}
                    Password
                  </label>
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="bg-inputBg mt-2 focus:border-[1px] text-[14px] border-bg2 rounded-md outline-none w-full pl-3 p-3 placeholder:text-gray text-gray"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 top-12 pr-3 flex items-center text-gray opacity-25"
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
              </div>

              <div className=" w-full flex items-center space-x-2 mt-4">
                <div
                  onClick={() => setCheckAgreement(!checkAgreement)}
                  className={`w-6 h-6 flex items-center cursor-pointer rounded-full 
                    ${
                      checkAgreement
                        ? "text-lightGray bg-white "
                        : "text-chocolate"
                    }`}
                >
                  {checkAgreement ? (
                    <img className="w-5 h-5" src={tikki} alt="df" />
                  ) : (
                    <div className="border-[1px] border-[#c8c9cc] p-2.5 rounded-full"></div>
                  )}
                </div>
                <label
                  htmlFor="agree"
                  className="text-gray select-none text-xs sm:text-base md:text-xs"
                >
                  Remember Password
                </label>
              </div>

              <div className="flex flex-col font-bold items-center justify-center">
                <button
                  type="submit"
                  className="w-[90%] font-bold tracking-[0.20333rem] py-2.5 rounded-full border-none bg-gradient-to-b from-red to-redLight shadow-lg flex items-center justify-center"
                >
                  Log in
                </button>
                <button className="w-[90%] border border-redLight mt-5 tracking-[2px] rounded-full p-2">
                  {" "}
                  <Link
                    to="/register"
                    className="font-bold text-sm hover:underline text-redLight tracking-[0.20333rem] "
                  >
                    Register
                  </Link>
                </button>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-2 w-full text-gray text-xsm mt-10">
            <Link
              to="/forgotPassword"
              className="col-span-1 flex flex-col items-center justify-center"
            >
              <img className="w-8 h-9" src={forgetPassword} alt="sd" />
              <p>Forgot Password</p>
            </Link>
            <Link
              to="/customerservices"
              className="col-span-1 flex flex-col items-center justify-center"
            >
              <img className="w-11 h-10" src={cutomerService} alt="sd" />
              <p>Customer Service</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
