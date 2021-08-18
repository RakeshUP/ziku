const Hero: React.FC<{ scrollToTrade: () => any }> = ({ scrollToTrade }) => (
  <section className="w-11/12 max-w-screen-xl mx-auto">
    <h1 className="text-5xl lg:text-8.5xl leading-tight font-extrabold text-center">
      <p className="gradient-text">DeFi Options</p>
      <p className="opacity-90">for beginners.</p>
    </h1>
    <h2 className="w-10/12 lg:w-1/2 mx-auto mt-16 lg:mt-12 text-center text-lg lg:text-xl lg:leading-relaxed opacity-80">
      Earn income by speculating on the price movements of crypto
      assets within a specific timeframe by buying options.
    </h2>
    <button
      id="Start Earning"
      onClick={scrollToTrade}
      className="border-2 border-gray-700 px-10 py-4 rounded-xl text-base lg:text-lg uppercase font-medium block mx-auto mt-20 lg:mt-24 gradient-button hover:text-gray-900 focus:outline-none tracking-wider"
    >
      Start Earning
    </button>
    <p className="mt-2 text-center text-xs text-gray-400">
      Powered by
      {' '}
      <a
        id="Powered by Opyn"
        href="https://www.opyn.co/"
        target="_blank"
        className="hover:text-cyan text-base font-medium"
        rel="noreferrer"
      >
        Opyn
      </a>
    </p>
  </section>
);

export default Hero;
