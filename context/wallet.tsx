import React, { useCallback, useContext, useEffect, useMemo, useState } from "react"
import Web3 from 'web3'
import { ethers } from 'ethers';
import Onboard from 'bnc-onboard'
import { API } from "bnc-onboard/dist/src/interfaces"

enum Networks {
  MAINNET = 1,
  ROPSTEN = 3,
}

type WalletType = {
  web3: Web3 | null
  address: string,
  network: Networks,
  signer: any,
  selectWallet: () => void,
  connected: boolean
}

const initialState: WalletType = {
  web3: null,
  address: '',
  network: Networks.MAINNET,
  signer: null,
  selectWallet: () => null,
  connected: false,
}

const walletContext = React.createContext<WalletType>(initialState)
const useWallet = () => useContext(walletContext)

const WalletProvider: React.FC = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState(0)
  const [onboard, setOnboard] = useState<API | null>(null)
  const [signer, setSigner] = useState<any>(null);
  const [connected, setConnected] = useState(false);


  const onWalletSelect = useCallback(async () => {
    if (!onboard) return;
    onboard.walletSelect().then(success => {
      if (success)
        onboard.walletCheck()
    });
  }, [onboard])

  const store: WalletType = useMemo(() => ({
    web3,
    address,
    network,
    signer,
    connected,
    selectWallet: onWalletSelect
  }), [web3, address, network, onWalletSelect])

  useEffect(() => {

    const onNetworkChange = (updateNetwork: number) => {
      if (updateNetwork in Networks) {
        setNetwork(updateNetwork)
        if (onboard !== null) {
          localStorage.setItem('networkId', updateNetwork.toString());
          onboard.config({
            networkId: updateNetwork
          })
        }
      }
    };

    const onWalletUpdate = (wallet: any) => {
      if (wallet.provider) {
        window.localStorage.setItem('selectedWallet', wallet.name);
        const provider = new ethers.providers.Web3Provider(wallet.provider);
        setWeb3(new Web3(wallet.provider));
        setConnected(true);
        setSigner(() => provider.getSigner());
      }
    };

    const _network = network !== 0 ? network : parseInt(localStorage.getItem('networkId')) || Networks.MAINNET;

    const onboard = Onboard({
      dappId: '4fcbcfd8-9eb1-4cda-aa63-046f9637aef7',
      networkId: _network,
      darkMode: true,
      subscriptions: {
        address: setAddress,
        network: onNetworkChange,
        wallet: onWalletUpdate,
        balance: (balance) => console.log(balance)
      },
      walletSelect: {
        wallets: [
          { walletName: 'metamask', preferred: true },
          { walletName: 'coinbase', preferred: true }
        ]
      }
    })

    setOnboard(onboard);

    const previouslySelectedWallet = window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet).then(success => {
        console.log('Connected to wallet')
      })
    }
  }, [network])

  return (
    <walletContext.Provider value={store}>
      {children}
    </walletContext.Provider>
  )
};

export { useWallet, WalletProvider };
