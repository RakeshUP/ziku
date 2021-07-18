import Head from 'next/head';
import React, { useMemo, useRef } from 'react';

import Header from '../containers/Header';
import Hero from '../containers/Hero';
import OptionsIntro from '../containers/OptionsIntro';
import TradeNow from '../containers/TradeNow';
import Footer from '../containers/Footer';
import { useWallet } from "../context/wallet";
import useOptions from '../hooks/useOptions';

export default function Home() {
  const { address, selectWallet } = useWallet();
  const { options, parsedOptions } = useOptions()

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
        <link rel="icon" type="image/png" href="/favicon.svg"/>
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
