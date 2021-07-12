import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useMemo, useRef } from 'react';
import BigNumber from 'bignumber.js';

import Header from '../containers/Header';
import Hero from '../containers/Hero';
import OptionsIntro from '../containers/OptionsIntro';
import TradeNow from '../containers/TradeNow';
import Footer from '../containers/Footer';
import OPTIONS_QUERY from '../queries/optionsQuery';
import { otokens, otokensVariables } from '../queries/__generated__/otokens';
import apolloClient from '../utils/apollo-client'
import { useWallet } from "../context/wallet";

export default function Home({ options, parsedOptions }) {
  const { address, selectWallet } = useWallet();

  const tradeRef = useRef<HTMLDivElement>(null);

  const displayAddress = useMemo(() => {
    if (!address) return null;
    return address.slice(0, 8) + '…' + address.slice(address.length - 8, address.length)
  }, [address]);

  const scrollToTrade = () => tradeRef.current.scrollIntoView({ block: 'center' })

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;800&display=swap" rel="stylesheet" />
      </Head>
      <Header address={address} selectWallet={selectWallet} displayAddress={displayAddress} />
      <main className="mt-16 lg:mt-24">
        <div>
          <Hero scrollToTrade={scrollToTrade} />
          <OptionsIntro />
          <TradeNow tradeRef={tradeRef} options={options} parsedOptions={parsedOptions} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const parsedOptions = {
    WETH: { puts: {}, calls: {} },
    WBTC: { puts: {}, calls: {} },
  }
  const current = parseInt((Date.now() / 1000).toString());
  const { data } = await apolloClient[1].query<otokens, otokensVariables>({ query: OPTIONS_QUERY, variables: { expiry: current } })
  const oTokens = data.otokens
    .filter((o) => new Date(o.expiryTimestamp * 1000).getUTCDay() === 5)
    .sort((a, b) => new BigNumber(a.strikePrice).minus(new BigNumber(b.strikePrice)).toNumber())
  for (const option of oTokens) {
    if (option.underlyingAsset.symbol === option.collateralAsset.symbol) {
      if (!parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp]) {
        parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp] = []
      }
      parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp].push(option)
    } else {
      if (!parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp]) {
        parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp] = []
      }
      parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp].push(option)
    }
  }
  return { props: { options: oTokens, parsedOptions } }
}
