import React from 'react';

const StepFive:React.FC = () => (
  <div className="w-11/12 mx-auto lg:w-full p-4 py-10 border-2 border-gray-700 rounded-xl text-center text-lg lg:text-xl">
    <h1 className="font-semibold text-4xl text-white text-opacity-90 inline">woohoo!</h1>
    <span className="text-4xl ml-2">🥳</span>
    <h2 className="mt-10 opacity-80 leading-relaxed">
      You've bought an option!
      <br />
      Let the world know about Ziku
    </h2>
    <div className="mt-6 flex flex-col justify-center items-center lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
      <a href="https://twitter.com/zikufinance?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-show-count="false">Follow @zikufinance</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <a href="https://twitter.com/intent/tweet?screen_name=zikufinance&ref_src=twsrc%5Etfw" className="twitter-mention-button" data-size="large" data-show-count="false">Tweet to @zikufinance</a><script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  </div>
)

export default StepFive;