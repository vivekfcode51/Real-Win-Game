import feedbackImg from '../../assets/images/feedbackImg.png'

function Feedback() {
  return (
    <div className='text-xs px-3'>
      <div className='shadow-lg bg-bg2 rounded-lg p-2 mt-5 pb-20'>Welcome to feedback,please give feedback-please describe the problem in detail when providing feedback, perfectly attach the screenshot of your problem you encountered,we will immediately process your feedback!</div>
      <h1 className='text-center font-bold mt-5'>Send helpful feedback</h1>
      <h1 className='text-center font-bold mt-3'>Change to win Mystery Rewards</h1>
      <div className='mt-5'>
        <img src={feedbackImg} alt="ds" />
      </div>
      <div>
        <button className="w-full mt-10 tracking-wider bg-blue-500 text-white text-sm font-semibold py-3 rounded-full shadow-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  )
}

export default Feedback