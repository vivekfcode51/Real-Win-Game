import { useEffect, useState } from 'react'
import { getFirstDepositPlans } from './gameApi';
import { useNavigate } from 'react-router-dom';

function FirstDeposit() {
    const [getFirstDepositPlansData, setgetFirstDepositPlansData] = useState([])
    const userId = localStorage.getItem("userId")
        const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getFirstDepositPlans(userId);
            setgetFirstDepositPlansData(data);
        };
        fetchData();
    }, [userId]);
    return (
        <div className='px-3'>
            {getFirstDepositPlansData?.length > 0 ? getFirstDepositPlansData?.map((item, i) => (
                <div className='bg-inputBg w-full rounded-lg p-2 mt-3' key={i}>
                    <div className='flex items-center justify-between'>
                        <p className='text-black'>First deposit <span className='text-gold'>{item?.first_deposit_ammount}</span></p>
                        <p className='text-gold'>+ ₹{item?.bonus.toFixed(2)}</p>
                    </div>
                    <div className='text-gray mt-2'>Deposit <span>{item?.first_deposit_ammount}</span> for the first time and you will receive <span>{item?.bonus}</span> bonus</div>
                    <div className='flex items-center justify-between w-full mt-4'>
                        <p className=' py-0.5 px-2 bg-gray2 rounded-full w-1/2 text-center'>{item?.status === 0 ? item?.first_deposit_ammount : "0"}/{item?.first_deposit_ammount}</p>
                        <button
                            disabled={item?.status === 0}
                            onClick={() => item?.status === 1 && navigate("/wallet/deposit")}
                            className={`text-gold border border-gold py-1 px-5 rounded-lg ${item?.status === 0 ? " cursor-not-allowed" : ""}`}
                        >
                            {item?.status === 0 ? "Deposited" : "Deposit"}
                        </button>
                    </div>
                </div>
            )) :
                <div className='mt-10 text-black w-full text-center text-2xl'>no data</div>
            }
        </div>
    )
}

export default FirstDeposit