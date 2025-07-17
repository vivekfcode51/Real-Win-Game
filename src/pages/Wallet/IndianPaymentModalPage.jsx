import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";
import plus from "../../assets/usaAsset/wallet/plus.png";
import { FiCopy } from "react-icons/fi";

const IndianPaymentModalPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { amount } = useParams();
  const userId = localStorage.getItem("userId");

  const [indianQr, setIndianQr] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [indianScreenshot, setIndianScreenshot] = useState(null); // base64 image
  const [screenshotFile, setScreenshotFile] = useState(null); // actual file

  // Fetch QR
  const indianQrPayment = async () => {
    try {
      const res = await axios.get(
        // "https://rootvinster11.mobileappdemo.net/api/get-qrcode"
        "https://real-win.globalbet786.live/api/show_qr"
      );
      // Full response console me dikhayenge
      console.log("Full Response qr type 0 =>", res);

      // Sirf QR image url dikhana ho to
      // console.log("QR Code URL =>", res.data.data[0].orcode);

      setIndianQr(res?.data?.data[0]);
    } catch (error) {
      console.error("QR error", error);
    }
  };

  useEffect(() => {
    indianQrPayment();
  }, []);

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    setScreenshotFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setIndianScreenshot(reader.result); // base64 string
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const payload = {
      user_id: userId,
      cash: Number(amount),
      transaction_id: transactionId,
      screenshot: indianScreenshot,
      // screenshot: base64Only,
      type: 0,
    };

    try {
      const res = await axios.post(
        "https://real-win.globalbet786.live/api/manual_payin",
        payload
      );
      console.log("upload screen short Response type 0:", res);
      console.log("payload screenshoet",payload)
      toast.success("Deposit submitted successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate(-1);
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  console.log("ndbjvvw", indianQr);

  return (
    <div className="flex items-center justify-center min-h-screen bg-inputBg bg-opacity-30">
      <div className="bg-[#FFFFFF] p-6 rounded-md text-center shadow-lg w-[22rem]">
        {amount && (
          <p className="mt-3 w-full p-1 bg-inputBg border-none text-red rounded-[12px] font-bold">
            ₹ {Number(amount).toLocaleString()}
          </p>
        )}

        {indianQr ? (
          <img
            src={indianQr?.qr_code}
            alt="QR Code"
            className="w-60 h-56 object-contain mx-auto mt-4 rounded"
          />
        ) : (
          <p className="text-sm text-gray mt-4">Loading QR...</p>
        )}
        {/* hhhhhh */}
        <div className="relative mt-3 w-full py-1.5 bg-inputBg border-none text-gray rounded-[12px]">
          <p className="text-[14px]">{indianQr?.wallet_address}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(indianQr?.wallet_address || "");
              toast.success("UPI ID copied to clipboard!", {
                position: "top-center",
                autoClose: 2000,
              });
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red hover:text-green"
          >
            <FiCopy size={18}  className="text-rose-400"/>
          </button>
        </div>

        <div
          className={`rounded-lg mt-3 p-2 min-h-[5.5rem] ${
            !indianScreenshot ? "bg-inputBg" : ""
          }`}
        >
          {!indianScreenshot ? (
            <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleScreenshotUpload}
                className="hidden"
              />
              <img className="w-10 h-10" src={plus} alt="Upload" />
              <h3 className="text-xs mt-1 text-gray font-semibold text-center">
                Upload Screenshot
              </h3>
            </label>
          ) : (
            <div className="relative w-40 h-40 mx-auto">
              <button
                onClick={() => {
                  setIndianScreenshot(null);
                  setScreenshotFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute -top-2 -right-2 rounded-full shadow p-[2px] hover:bg-redLight"
              >
                <RxCrossCircled
                  className="text-red hover:text-gray"
                  size={20}
                />
              </button>
              <img
                src={indianScreenshot}
                alt="Screenshot Preview"
                className="w-full h-full object-contain rounded-md border"
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className={`mt-4 w-full text-gray bg-red py-3 rounded-full border-none text-xsm`}
        >
         Deposit
        </button>

        {/* <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-red text-bg6 px-4 py-2 rounded-md"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default IndianPaymentModalPage;
