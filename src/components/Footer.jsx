
import { Link, useLocation } from "react-router-dom"
import diamond from "../assets/images/diamond.png"
import footerBg from "../assets/usaAsset/homeScreen/footerBg.png"
import home_color from "../assets/usaAsset/footer/home_color.png"
import activity_color from "../assets/usaAsset/footer/activity_color.png"
import wallet_color_bg from "../assets/usaAsset/footer/wallet_color_bg.png"
import account_color from "../assets/usaAsset/footer/account_color.png"
import homeLight from "../assets/usaAsset/footer/homeLight.png"
import activityLight from "../assets/usaAsset/footer/activityLight.svg"
import walletLight from "../assets/usaAsset/footer/walletLight.png"
import accountLight from "../assets/usaAsset/footer/accountLight.png"
function Footer() {
  const location = useLocation()
  return (
    <div className="z-40 relative grid grid-cols-5 pt-4 items-center h-[5rem] xsm:h-[4rem]"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link to="/" className="z-40 col-span-1 flex flex-col items-center">
        <img src={location.pathname === "/" ? home_color : homeLight} className="w-6 h-6 " alt="" />
        <p className="text-xs text-red">Home</p>
      </Link>
      <Link to="/activity" className="z-40 col-span-1 flex flex-col items-center">
        <img src={location.pathname === "/activity" ? activity_color : activityLight} className="w-6 h-6 " alt="" />
        <p className="text-xs  text-red">Activity</p>
      </Link>
     
      <Link to="/promotion" className="z-40 -mt-9 xsm:-mt-8 col-span-1 flex flex-col items-center ">
        <div className="flex items-center justify-center bg-red border-[2px] border-bg1 rounded-full h-16 w-16 xsm:h-14 xsm:w-14">
          <img src={diamond} className="h-6 w-7 mt-1" alt="diamond not found" />
        </div>
        <p className="text-xs  text-red  ">Promotion</p>
      </Link>
      <Link to="/wallet" className="z-40 col-span-1 flex flex-col items-center">
        <img src={location.pathname === "/wallet" ? wallet_color_bg : walletLight} className="w-6 h-6 " alt="" />
        <p className="text-xs  text-red ">Wallet</p>
      </Link>
      <Link to="/profile" className="z-40 col-span-1 flex flex-col items-center">
        <img src={location.pathname === "/profile" ? account_color : accountLight} className="w-6 h-6 " alt="" />
        <p className="text-xs  text-red" >Account</p>
      </Link>
    </div>
  )
}

export default Footer