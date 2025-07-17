import { NavLink } from "react-router-dom";
import ques from "../assets/usaAsset/trx/ques.png"
/* eslint-disable react/prop-types */
const GameHistoryBoxTrx = ({ isVisible, gameHistoryData }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full px-2 mt-5">
      {/* Header */}
      <div className="flex text-xsm w-full bg-redLight rounded-t-lg py-2 gap-0.5 font-semibold">
        <p className=" text-nowrap w-[29%] flex justify-center items-center">Period</p>
        <p className="  w-[24%] flex text-nowrap justify-center items-center">Block height</p>
        <p className="  w-[24%] flex text-nowrap justify-center items-center">Block time</p>
        <p className="  w-[24%] flex text-nowrap justify-center items-center">Hash value</p>
        <p className="  w-[21%] flex text-nowrap justify-center items-center">Result</p>
      </div>
      {/* Data Rows */}
      {gameHistoryData?.map((item, i) => {
        return (
          <div key={i} className='flex w-full border-b-[1px] border-border1 text-black text-xsm bg-white py-2'>
            <p className='w-[33%] flex justify-start items-center'>
              {item?.period?.slice(0, 3)}***
              {item?.period?.slice(-4)}
            </p>

            <NavLink to={`/lottery/trxwingo/tronscan2?blockid=${item?.blocknumber}`} className='w-[22%] flex flex-col justify-center items-center'>
              <p>
                <img src={ques} alt="d" className="w-4 h-4" />
              </p>
              <p>{item?.blocknumber}</p>
            </NavLink>
            <p className='w-[22%] flex flex-col justify-center items-center'>
              <p>{item?.blocktime.slice(-8)}</p>
            </p>
            <p className='w-[22%] flex flex-col justify-center items-center'>
              <p>{item?.hash_value}</p>
            </p>
            <div className='flex h-[30px]  text-sm justify-center items-center w-[22%] relative'>
              {item?.result === 0 && (
                <>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-red"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.result}
                  </span>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-voilet"
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.result}
                  </span>
                  <p className="text-bg3 absolute -mr-6">S</p>
                </>
              )}
              {item?.result === 5 && (
                <>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-red"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.result}
                  </span>
                  <span
                    className="absolute inset-0 ml-4 mt-1 rounded-full w-5 h-5 text-white bg-voilet"
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item?.result}
                  </span>
                  <p className="text-yellow absolute -mr-6">B</p>
                </>
              )}

              {/* {item?.result !== 0 && item?.result !== 5 && (
                <span
                  className={`absolute inset-0 rounded-full ${item?.result === 1 || item?.result === 3 || item?.result === 7 || item?.result === 9 ? 'text-green' : 'text-red'}`}
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item?.result}
                </span>
              )} */}
              {item?.result !== 0 && item?.result !== 5 && (
                <div className="flex items-center gap-1">
                  <p className={`w-5 h-5 rounded-full text-white flex items-center justify-center ${[1, 3, 7, 9].includes(item?.result) ? "bg-green" : "bg-red"}`} >{item?.result}</p>
                  <p className={`${[0, 1, 2, 3, 4].includes(item?.result) ? "text-bg3" : "text-yellow"}`}>{[0, 1, 2, 3, 4].includes(item?.result) ? "S" : "B"}</p>

                  {/* <span
                    className={`absolute inset-0 w-5 h-5 text-white rounded-full ${item?.result === 1 || item?.result === 3 || item?.result === 7 || item?.result === 9 ? 'bg-green' : 'bg-red'}`}
                    style={{
                      clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                  {item?.result}
                  </span> */}
                </div>
              )}
            </div>
            {/* <p className='w-[22%] text-[12.8px] flex justify-center items-center'>{json[1]}</p>
              <div className='flex justify-center items-center w-[22%] gap-2'>
                <p className={`h-3 w-3 bg-${json[0] == 0 ? "red" : json[0] == 5 ? "green" : json[0] == 1 ? "green" : json[0] == 3 ? "green" : json[0] == 7 ? "green" : json[0] == 9 ? "green" : "red"} rounded-full flex justify-center items-center`}></p>
                <p className={`${json[0] == 0 ? "block" : json[0] == 5 ? "block" : "hidden"} h-3 w-3 bg-${json[2] === "Green" ? "green" : json[2] === "Red" ? "red" : "voilet"} rounded-full flex justify-center items-center`}></p>
              </div> */}
          </div>
        )
      })}
    </div>
  );
};

export default GameHistoryBoxTrx;
