import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import { useWallet, WalletProvider } from '../context/wallet';
import { TradeProvider } from '../context/TradeNow';
import client from '../utils/apollo-client';

const theme = createTheme({
  palette: {
    type: 'dark'
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <TradeApp Component={Component} pageProps={pageProps} />
    </WalletProvider>
  );
}

const TradeApp = ({ Component, pageProps }) => {
  const { network } = useWallet();

  return (
    <ApolloProvider client={client[network] || client[1]}>
      <ThemeProvider theme={theme}>
        <TradeProvider>
          <Component {...pageProps} />
        </TradeProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp;
