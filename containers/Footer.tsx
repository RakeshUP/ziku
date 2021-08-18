const Footer = () => (
  <footer className="mt-28 border-t-2 border-gray-700">
    <div className="w-11/12 max-w-screen-xl mx-auto py-8 lg:flex justify-between text-gray-300 tracking-wider">
      <p className="lg:w-1/3 font-light">
        <span className="font-medium">Ziku</span>
        {' '}
        is a product by 
        {' '}
        <a
          id="Wisgloo Home"
          href="https://wisgloo.com/"
          target="_blank"
          className="font-medium hover:text-cyan"
          rel="noreferrer"
        >
          Wisgloo Labs
        </a>
        , a mission-driven product studio that works to solve meaningful problems worldwide.
      </p>
      <div className="mt-6 lg:mt-0 lg:text-right text-xs lg:text-sm">
        <a
          id="Ziku Twitter"
          href="https://twitter.com/zikufinance"
          target="_blank"
          className="block uppercase hover:text-cyan"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          id="Ziku Github"
          href="https://github.com/wisgloo/ziku"
          target="_blank"
          className="mt-2 block uppercase hover:text-cyan"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
