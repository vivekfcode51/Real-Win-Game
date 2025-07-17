import { Link } from 'react-router-dom'
// import risk from '../../assets/usaAsset/aboutus/risk.png'
// import confi from '../../assets/usaAsset/aboutus/confidential.png'
import service_about from '../../assets/usaAsset/aboutus/service_about.png'
import service_guide from '../../assets/usaAsset/aboutus/service_guide.png'
import invitation from '../../assets/usaAsset/aboutus/invitation.png'
import invitationCode1 from '../../assets/usaAsset/aboutus/invitationCode.png'
import aboutus from '../../assets/images/aboutus.png'
import { MdKeyboardArrowRight } from 'react-icons/md'


function AboutUs() {
    const naivatorhandle = (type) => {
        localStorage.setItem("abousType", type)
    }

    return (
        <div>
            <div className='bg-bg3'>
                <img src={aboutus} alt="sd" className='w-[90%] ' />
            </div>
            <div className=' text-blackLight mx-3 mt-3 rounded-md'>
                <Link onClick={() => naivatorhandle(1)} to="/aboutus/child" className='px-2 border-b border-bg1 py-4 text-xsm flex justify-between items-center'>
                    <div className='flex items-center'>
                        <img src={service_about} className='rounded-full h-8 w-8' alt="not found" />&nbsp;About Us
                    </div>
                    <div className='flex items-center'>
                        <MdKeyboardArrowRight size={25} className="text-gray" />
                    </div>
                </Link>
                <Link onClick={() => naivatorhandle(5)}  to="/aboutus/child" className='px-2 border-b border-bg1 py-4 text-sm flex justify-between items-center' >
                    <div className='flex items-center'>
                        <img src={invitationCode1} className='rounded-full h-8 w-8' alt="not found" />&nbsp;Confidentiality Agreement
                    </div>
                    <div className='flex items-end'>
                        <MdKeyboardArrowRight size={25} className="text-gray" />
                    </div>
                </Link>
                <Link onClick={() => naivatorhandle(6)}  to="/aboutus/child" className='px-2 border-b border-bg1 py-4 text-sm flex justify-between items-center' >
                    <div className='flex items-center'>
                        <img src={invitation} className='rounded-full h-8 w-8' alt="not found" />&nbsp;Risk Disclosure Agreement
                    </div>
                    <div className='flex items-end'>
                        <MdKeyboardArrowRight size={25} className="text-gray" />
                    </div>
                </Link>
                <Link onClick={() => naivatorhandle(2)} to="/aboutus/child" className='px-2 border-b border-bg1 py-4 text-sm flex justify-between items-center' >
                    <div className='flex items-center'>
                        <img src={service_guide} className='rounded-full h-8 w-8' alt="not found" />&nbsp;Terms & Condition
                    </div>
                    <div className='flex items-end'>
                        <MdKeyboardArrowRight size={25} className="text-gray" />
                    </div>
                </Link>
                <Link onClick={() => naivatorhandle(7)}  to="/aboutus/child" className='px-2 border-b border-bg1 py-4 text-sm flex justify-between items-center' >
                    <div className='flex items-center'>
                        <img src={invitation} className='rounded-full h-8 w-8' alt="not found" />&nbsp;UP Color FAQs
                    </div>
                    <div className='flex items-end'>
                        <MdKeyboardArrowRight size={25} className="text-gray" />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AboutUs