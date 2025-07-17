import Home from "./pages/Home/Home";
import WinGo from "./pages/Lottery/WinGo";
import Layout from "./Layout";
import { createBrowserRouter } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Wallet from "./pages/Wallet/Wallet";
import Activity from "./pages/Activity/Activity";
import KThree from "./pages/Lottery/KThree";
import FiveD from "./pages/Lottery/FiveD";
import TrxWingGo from "./pages/Lottery/TrxWingGo";
import ActivityAward from "./pages/Activity/ActivityAward";
import InvitationBonus from "./pages/Activity/InvitationBonus";
import Rebate from "./pages/Activity/Rebate";
import CollectionRecord from "./pages/Activity/CollectionRecord";
import InvitationRewardRule from "./pages/Activity/InvitationRewardRule";
import InvitationRecord from "./pages/Activity/InvitationRecord";
import ActivityGifts from "./pages/Activity/ActivityGifts";
import AttendanceBonus from "./pages/Activity/AttendanceBonus";
import GameRule from "./pages/Activity/GameRule";
import AttendanceHistory from "./pages/Activity/AttendanceHistory";
import Deposit from "./pages/Wallet/Deposit";
import Withdrawal from "./pages/Wallet/Withdrawal";
import DepositHistory from "./pages/Wallet/DepositHistory";
import WithdrawalHistory from "./pages/Wallet/WithdrawalHistory";
import AddBankAccountDetails from "./pages/Wallet/AddBankAccountDetails";
import AddUSDTWalletADdress from "./pages/Wallet/AddUSDTWalletADdress";
import Notifications from "./pages/Services.jsx/Notifications";
import VIP from "./pages/Services.jsx/VIP";
import GameHistory from "./pages/Services.jsx/GameHistory";
import AllTransactionsHistory from "./pages/Services.jsx/AllTransactionsHistory";
import Setting from "./pages/Services.jsx/Setting";
import Feedback from "./pages/Services.jsx/Feedback";
import CustomerServices from "./pages/Services.jsx/CustomerServices";
import BeginnersGuide from "./pages/Services.jsx/BeginnersGuide";
import AboutUs from "./pages/Services.jsx/AboutUs";
import ChangePassword from "./pages/Profile/ChangePassword";
import BindMailbox from "./pages/Profile/BindMailbox";
import AboutUsChild from "./pages/Services.jsx/AboutUsChild";
import ConfidentialAgreement from "./pages/Services.jsx/ConfidentialAgreement";
import RiskDisclosureAgreement from "./pages/Services.jsx/RiskDisclosureAgreement";
import TermsCondition from "./pages/Services.jsx/TermsCondition";
import FAQs from "./pages/Services.jsx/FAQs";
import ChangeAvatar from "./pages/Profile/ChangeAvatar";
import DragonTigerHome from "./pages/DragonTiger.jsx/DragonTigerHome";
import DragonTigerSplashScreen from "./pages/DragonTiger.jsx/DragonTigerSplashScreen";
import DragonTigerHistory from "./pages/DragonTiger.jsx/DragonTigerHistory";
import AndarBaharHome from "./pages/AndarBahar.jsx/AndarBaharHome";
import AndarBaharHistory from "./pages/AndarBahar.jsx/AndarBaharHistory";
import ForgotPassword from "./auth/ForgotPassword";
import SelectBank from "./pages/Wallet/SelectBank";
import PromotionHome from "./pages/Promotion/PromotionHome";
import SubordinateData from "./pages/Promotion/SubordinateData";
import CommissionDetails from "./pages/Promotion/CommissionDetails";
import InvitationRules from "./pages/Promotion/InvitationRules";
import RebateRatio from "./pages/Promotion/RebateRatio";
import FundTransfer from "./pages/Wallet/FundTransfer";
import ActivityDetails from "./pages/Activity/ActivityDetails";
import NewSubordinate from "./pages/Promotion/NewSubordinate";
import EditBankAccountDetails from "./pages/Wallet/EditBankAccountDetails";
import SuperJackpot from "./pages/Activity/SuperJackpot";
import ComingSoon from "./reusable_component/ComingSoon";
import AllGames from "./pages/Home/AllGames";
import FirstDeposit from "./reusable_component/FirstDeposit";
import TronscanViewer from "./pages/Lottery/TronscanViewer";
import TronscanViewer2 from "./pages/Lottery/Transconviewer2";
import AvitatorLayout from "./pages/AviatorGame/AvitatorLayout";
import IndianPaymentModalPage from "./pages/Wallet/IndianPaymentModalPage";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/register/:referralCode",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/aboutus/risk",
        element: <RiskDisclosureAgreement />,
      },
      {
        path: "/allgames",
        element: <AllGames />,
      },
      {
        path: "/allFirstDepositPlans",
        element: <FirstDeposit />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "/aviator",
        element:  <AvitatorLayout /> ,
      },
      {
        path: "/comingsoon",
        element: <ComingSoon />,
      },
      {
        path: "/dragonSplash",
        element: <DragonTigerSplashScreen />,
      },
      {
        path: "/dragonTiger",
        element: <DragonTigerHome />,
      },
      {
        path: "/dragonTiger/history",
        element: <DragonTigerHistory />,
      },
      {
        path: "/andarbahar",
        element: <AndarBaharHome />,
      },
      {
        path: "/andarbahar/history",
        element: <AndarBaharHistory />,
      },
      {
        path: "/lottery/wingo",
        element: <WinGo />,
      },
      {
        path: "/lottery/k3",
        element: <KThree />,
      },
      {
        path: "/lottery/5d",
        element: <FiveD />,
      },
      {
        path: "/lottery/trxwingo",
        element: <TrxWingGo />,
      },
      {
        path: "/lottery/trxwingo/tronscan",
        element: <TronscanViewer />,
      },
      {
        path: "/lottery/trxwingo/tronscan2",
        element: <TronscanViewer2 />,
      },
      {
        path: "/activity",
        element: <Activity />,
      },
      {
        path: "/activity/details/:id",
        element: <ActivityDetails />,
      },
      {
        path: "/activity/award",
        element: <ActivityAward />,
      },
      {
        path: "/activity/award/collectionrecord",
        element: <CollectionRecord />,
      },
      {
        path: "/activity/invitationbonus",
        element: <InvitationBonus />,
      },
      {
        path: "/activity/invitationbonus/invitationrewardrule",
        element: <InvitationRewardRule />,
      },
      {
        path: "/activity/invitationbonus/invitationrecord",
        element: <InvitationRecord />,
      },
      {
        path: "/activity/rebate",
        element: <Rebate />,
      },
      {
        path: "/activity/superJackpot",
        element: <SuperJackpot />,
      },
      {
        path: "/activity/gifts",
        element: <ActivityGifts />,
      },
      {
        path: "/activity/attendance",
        element: <AttendanceBonus />,
      },
      {
        path: "/activity/gamerule",
        element: <GameRule />,
      },
      {
        path: "/activity/attendacehistory",
        element: <AttendanceHistory />,
      },
      {
        path: "/promotion",
        element: <PromotionHome />,
      },
      {
        path: "/promotion/newSuboridnate",
        element: <NewSubordinate />,
      },
      {
        path: "/promotion/subordinatedata",
        element: <SubordinateData />,
      },
      {
        path: "/promotion/commissiondetail",
        element: <CommissionDetails />,
      },
      {
        path: "/promotion/invitationrules",
        element: <InvitationRules />,
      },
      {
        path: "/promotion/rebateratio",
        element: <RebateRatio />,
      },
      {
        path: "/wallet",
        element: <Wallet />,
      },
      {
        path: "/wallet/transfer",
        element: <FundTransfer />,
      },
      {
        path: "/wallet/deposit",
        element: <Deposit />,
      },
      {
        path: "/deposit/indianPayment/:amount",
        element: <IndianPaymentModalPage />
      },
      {
        path: "/wallet/withdrawal",
        element: <Withdrawal />,
      },
      {
        path: "/wallet/withdrawal/addbankaccount",
        element: <AddBankAccountDetails />,
      },
      {
        path: "/wallet/withdrawal/editbankaccount",
        element: <EditBankAccountDetails />,
      },
      {
        path: "/wallet/withdrawal/addbankaccount/selectbank",
        element: <SelectBank />,
      },
      {
        path: "/wallet/withdrawal/addusdtwalletaddress",
        element: <AddUSDTWalletADdress />,
      },
      {
        path: "/wallet/deposithistory",
        element: <DepositHistory />,
      },
      {
        path: "/wallet/withdrawalhistory",
        element: <WithdrawalHistory />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changeavatar",
        element: <ChangeAvatar />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
      {
        path: "/bindmail",
        element: <BindMailbox />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/vip",
        element: <VIP />,
      },
      {
        path: "/gamehistory",
        element: <GameHistory />,
      },
      {
        path: "/alltransactionhistory",
        element: <AllTransactionsHistory />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/customerservices",
        element: <CustomerServices />,
      },
      {
        path: "/beginnersguide",
        element: <BeginnersGuide />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/aboutus/child",
        element: <AboutUsChild />,
      },
      {
        path: "/aboutus/confidential",
        element: <ConfidentialAgreement />,
      },
      {
        path: "/aboutus/tc",
        element: <TermsCondition />,
      },
      {
        path: "/aboutus/faqs",
        element: <FAQs />,
      },
    ],
  },
]);
