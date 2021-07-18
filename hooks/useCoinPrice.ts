import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

export enum COINS {
  ETHEREUM='ethereum',
  BITCOIN='bitcoin'
}

const useCoinPrice = (coin: COINS) => {
  const [price, setPrice] = useState(new BigNumber(0));
  const [dayChange, setDayChange] = useState('');

  useEffect(() => {
    let isCancelled = false;

    async function updatePrice() {
      const { price, dayChange } = await getTokenPriceCoingecko(coin);
      if (!isCancelled) {
        setDayChange(dayChange);
        setPrice(price);
      }
    }
    updatePrice();
    const id = setInterval(updatePrice, 20000);

    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [coin]);

  return { price, dayChange };
};

export const getTokenPriceCoingecko = async (coin: COINS): Promise<{ price: BigNumber, dayChange: string }> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`;
  const res = await fetch(url);
  const { market_data : { current_price: { usd }, price_change_percentage_24h } } = await res.json();

  if (usd === undefined) return { price: new BigNumber(0), dayChange: price_change_percentage_24h };
  return { price: new BigNumber(usd), dayChange: price_change_percentage_24h };
};

export default useCoinPrice;
