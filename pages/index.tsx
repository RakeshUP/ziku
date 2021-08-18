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
        <script type="text/javascript" src="/gtag.js"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;800&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-247V4VFLH1"></script>
        <script type="text/javascript" src="/GA.js"></script>
        <link rel="icon" type="image/png" href="/favicon.svg"/>
        <script type="text/javascript" src="/hotjar.js"></script>
        <script type="text/javascript" src="/twitter.js"></script>
        <title>Ziku - Interactive interface for beginners to buy options</title>
      </Head>
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-T6JSJ78" 
          height="0" 
          width="0"
          style={{display:'none', visibility:'hidden'}} 
        />
      </noscript>
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
