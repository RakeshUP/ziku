import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';

import { useWallet, WalletProvider } from '../context/wallet';
import { TradeProvider } from '../context/TradeNow';
import client from '../utils/apollo-client';

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <TradeApp Component={Component} pageProps={pageProps} />
    </WalletProvider>
  );
}

const TradeApp = ({ Component, pageProps }) => {
  const { network } = useWallet();
  console.log(client[network])

  return (
    <ApolloProvider client={client[network] || client[1]}>
      <TradeProvider>
        <Component {...pageProps} />
      </TradeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
