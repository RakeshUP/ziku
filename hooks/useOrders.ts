import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useWallet } from "../context/wallet";
import { getOrdersForOToken } from "../utils/0x-util";
import { toTokenAmount } from "../utils/calculations";

const useOrders = (token: string) => {
  const { network } = useWallet();

  const [asks, setAsks] = useState([]);
  const [bestPrice, setBestPrice] = useState(0);
  const [maxAmount, setMaxAmount] = useState(new BigNumber(0));


  useEffect(() => {
    if (token && token !== '') {
      getOrdersForOToken(token, network).then((orders: any) => {
        const { asks } = orders;
        const _bestPrice = asks.reduce((acc, current) => {
          const price = toTokenAmount(current.order.takerAmount, 6)
            .div(toTokenAmount(current.order.makerAmount, 8)).toNumber();
          if (price < acc) {
            return price;
          }
          return acc;
        }, Infinity);

        const _maxAmount = asks.reduce((acc: BigNumber, current) =>
          acc.plus(current.order.makerAmount), new BigNumber(0));

        const roundedBestPrice = Math.ceil(_bestPrice * 100) / 100;
        setBestPrice(roundedBestPrice);
        setMaxAmount(_maxAmount);
        setAsks(asks)
      });

    }
  }, [network, token])

  return { asks, bestPrice, maxAmount };
};

export default useOrders;
