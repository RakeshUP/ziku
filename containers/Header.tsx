import { useState } from "react";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Position from './Position';

type HeaderProps = {
  address: string;
  selectWallet: () => void;
  displayAddress: string;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#202124',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: '16px',
  },
}));

const Header: React.FC<HeaderProps> = ({ address, selectWallet, displayAddress }) => {
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();


  return (
    <header className="sticky top-0 z-50" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
    <div className="flex justify-between items-center py-2 w-11/12 max-w-screen-xl mx-auto">
      <div className="text-xl font-semibold opacity-90">
        Ziku
      </div>
      <div>
        { address && address !== '' ?  (
          <button className="mr-6 hover:text-cyan focus:outline-none" onClick={() => setShowModal(true)}>
            My Positions
          </button>
        ) : null }
        <button
          onClick={selectWallet}
          className="border-2 border-gray-700 px-5 py-2.5 rounded-xl text-sm gradient-button hover:text-gray-900 focus:outline-none">
          {address && address !== '' ? displayAddress : 'Connect Wallet'}
        </button>
      </div>
    </div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <Position />
          </div>
        </Fade>
      </Modal>
  </header>
  )
}

export default Header;
