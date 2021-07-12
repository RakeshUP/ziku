type HeaderProps = {
  address: string;
  selectWallet: () => void;
  displayAddress: string;
}

const Header: React.FC<HeaderProps> = ({ address, selectWallet, displayAddress }) => (
  <header className="sticky top-0 z-50" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
    <div className="flex justify-between items-center py-2 w-11/12 max-w-screen-xl mx-auto">
      <div className="text-xl font-semibold opacity-90">
        Ziku
      </div>
      <button
        onClick={selectWallet}
        className="border-2 border-gray-700 px-5 py-2.5 rounded-xl text-sm gradient-button hover:text-gray-900 focus:outline-none">
        {address && address !== '' ? displayAddress : 'Connect Wallet'}
      </button>
    </div>
  </header>
);

export default Header;
