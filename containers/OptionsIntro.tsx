const OptionsIntro = () => (
  <section className="mt-20 lg:mt-32 w-11/12 max-w-screen-xl mx-auto pt-16 lg:pt-24 lg:flex justify-center items-center font-light">
    <div className="lg:w-5/12">
      <h1 className="text-center lg:text-left uppercase text-cyan font-medium tracking-wide">What is an Option ?</h1>
      <div className="mt-8 lg:mt-4 text-xl leading-normal text-white text-opacity-80 space-y-6">
        <p>
          Options are financial derivatives that give buyers the right,
          but not the obligation, to buy or sell an underlying asset at an agreed upon price and date.
        </p>
      </div>
    </div>
    <div className="lg:w-1/2 lg:flex lg:ml-14">
      <div className="rounded-xl border-2 border-gray-700 lg:w-1/2 mt-10 lg:mt-0 lg:mr-2 px-6 py-8 lg:pt-10 lg:pb-24 relative">
        <h1 className="text-xl text-cyan font-normal">
          Bullish on an asset
        </h1>
        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
          Pay a small premium for the option, select a price(strike price)
          you think the asset will rise above given an expiry date,
          and if it surpasses the strike price,
          you have the right to buy the asset at the strike price.
        </p>
      </div>
      <div className="rounded-xl border-2 border-gray-700 lg:w-1/2 mt-6 lg:mt-0 lg:ml-2 px-6 py-8 lg:pt-10 lg:pb-24 relative">
        <h1 className="text-xl text-cyan font-normal">
          Bearish on an asset
        </h1>
        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
          Pay a small premium for the option, select a price(strike price)
          you think the asset will go below given an expiry date,
          and if it goes below the strike price,
          you have the right to sell the asset at the strike price.
        </p>
      </div>
    </div>
  </section>
);

export default OptionsIntro;
