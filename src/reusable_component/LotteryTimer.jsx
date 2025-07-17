/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import TimerModal from "./TimerModal";

const LotteryTimer = ({timeLeft, duration }) => {
  // const socket = useSocket()
  // const [timeLeft, setTimeLeft] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("durationduration", duration)
  // const calculateTimeLeft = () => {
  //   const now = new Date();
  //   const secondsInCycle = (now.getMinutes() * 60 + now.getSeconds()) % duration;
  //   const remainingTime = duration - secondsInCycle;
  //   setTimeLeft(remainingTime);
  // };

  // useEffect(() => {
  //   calculateTimeLeft();
  //   const interval = setInterval(() => {
  //     calculateTimeLeft();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [duration]);

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      setIsWarning(true);
      setIsModalOpen(true);
    } else {
      setIsWarning(false);
      if (timeLeft > 5) setIsModalOpen(false);
    }
  }, [timeLeft]);
  // useEffect(()=>{
  //   // console.log("sfsdfsdg")
  //   const handleOneMin = (onemin) => {
  //     // console.log("onemin",onemin)
  //     const q = JSON.parse(onemin)
  //     // const t = Number(String(onemin)?.split('_')?.[1]);
  //     // const time_to_be_intro = t > 0 ? 60 - t : t;
  //     const time_to_be_intro = q?.timerBetTime
  //     setTimeLeft(time_to_be_intro);
  //     // fk.setFieldValue('show_this_one_min_time', time_to_be_intro);
  //     // if (
  //     //   time_to_be_intro === 5 ||
  //     //   time_to_be_intro === 4 ||
  //     //   time_to_be_intro === 3 ||
  //     //   time_to_be_intro === 2
  //     // ) {
  //     // }
  //     // if (time_to_be_intro <= 5) {
  //     //   fk.setFieldValue('openTimerDialog', true);
  //     //   Number(time_to_be_intro) <= 5 &&
  //     //     Number(time_to_be_intro) > 0 &&
  //     //     handlePlaySound();
  //     //   Number(time_to_be_intro) === 0 && handlePlaySoundLast();
  //     // } else {
  //     //   fk.setFieldValue('openTimerDialog', false);
  //     // }
  //     // if(time_to_be_intro){
  //     //   client.refetchQueries("myAllhistory_1");
  //     // }
  //     // if (time_to_be_intro === 0) {
  //     //   client.refetchQueries('myAllhistory_2');
  //     //   client.refetchQueries('wallet_amount');
  //     //   client.refetchQueries('gamehistory_2');
  //     //   client.refetchQueries('gamehistory_last_result_2');
  //     //   setTimeout(() => {
  //     //     dispatch(dummycounterFun());
  //     //   }, 2000);
  //     // }
  //   };
  //   // socket.on('onemin', handleOneMin);
  //   // return () => {
  //   //   socket.off('onemin', handleOneMin);
  //   // };
  // },[])
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatTime = (value) => value.toString().padStart(2, "0");
// console.log("lottery timer",timeLeft)
  return (
    <div className="relative w-full">
      <div className={`flex text-[1.3rem] justify-end space-x-1 ${isWarning ? "text-red" : ""}`}>
        <div className="bg-white font-extrabold text-black h-10 w-6 flex items-center justify-center ">
          {formatTime(minutes)[0]}
        </div>
        <div className="bg-white text-black h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(minutes)[1]}
        </div>
        <div className="bg-white text-black h-10 w-4 flex items-center justify-center font-semibold">
          :
        </div>
        <div className="bg-white text-black h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(seconds)[0]}
        </div>
        <div className="bg-white text-black h-10 w-6 flex items-center justify-center font-semibold">
          {formatTime(seconds)[1]}
        </div>
      </div>
      <div
        className="absolute mt-[3.9rem] xsm:mt-[4.9rem] flex items-center h-[16.5rem] xsm:h-[17.7rem] left-0"
        style={{ width: "214%", transform: "translateX(-50%)" }}
      >
        <TimerModal
         timeLeft={timeLeft}
          duration={duration}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default LotteryTimer;
