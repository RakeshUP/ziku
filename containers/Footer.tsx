const Footer = () => (
  <footer className="mt-28 border-t-2 border-gray-700">
    <div className="w-11/12 max-w-screen-xl mx-auto pb-8 lg:pb-3 py-3 flex justify-between items-center text-gray-300 tracking-wider">
      <a
        href="/"
        target="_blank"
        className="hover:text-cyan"
        rel="noreferrer"
      >
        © Ziku
      </a>
      <div className="text-xs space-x-5 lg:space-x-8">
        <a
          href="https://twitter.com/zikufinance"
          target="_blank"
          className="uppercase hover:text-cyan"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://github.com/wisgloo/ziku"
          target="_blank"
          className="uppercase hover:text-cyan"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
