import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

export enum COINS {
  ETHEREUM='ethereum',
  BITCOIN='bitcoin'
}

const useCoinPrice = (coin: COINS) => {
  const [price, setPrice] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updatePrice() {
      const price = await getTokenPriceCoingecko(coin);
      if (!isCancelled) setPrice(price);
    }
    updatePrice();
    const id = setInterval(updatePrice, 20000);

    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [coin]);

  return price;
};

export const getTokenPriceCoingecko = async (coin: COINS): Promise<BigNumber> => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;
  const res = await fetch(url);
  const priceStruct: { usd: number } = (await res.json())[coin.toLowerCase()];
  if (priceStruct === undefined) return new BigNumber(0);
  const price = priceStruct.usd;
  return new BigNumber(price);
};

export default useCoinPrice;
