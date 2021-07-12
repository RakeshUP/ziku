import { USDC } from "./address";
import { BigNumber } from 'bignumber.js';
import { Errors } from './constants';
import { SignedOrder, OrderWithMetaData } from '../types'

const getUrl = (network: 1 | 3) => {
  return network === 1 ? 'https://api.0x.org' : 'https://ropsten.api.0x.org';
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getOrdersForOToken = async (token: string, network: 1 | 3): Promise<{ asks: [], bids: []}> => {
  const url = `${getUrl(network)}/sra/v4/orderbook?baseToken=${token}&quoteToken=${USDC[network]}&perPage=100`;

  try {
    const res = await fetch(url);
    if (res.status === 429) {
      await sleep(2000);
      return getOrdersForOToken(token, network);
    } else {
      const result: { asks: any; bids: any } = await res.json();
      return {
        asks: result.asks.records,
        bids: result.bids.records,
      };
    }
  } catch (error) {
    return {
      asks: [],
      bids: [],
    };
  }
}

/**
 * Calculate amount of {takerAsset} need to pay if I want {amount} {makerAsset}
 * @param orderInfos ask orders
 * @param amount oToken I want to buy
 */
 export const calculateOrderInput = (orderInfos: OrderWithMetaData[], amount: BigNumber) => {
  if (amount.isZero()) {
    return {
      error: Errors.NO_ERROR,
      ordersToFill: [] as SignedOrder[],
      amounts: [] as BigNumber[],
      sumInput: new BigNumber(0),
    }
  }
  if (orderInfos.length === 0) {
    return {
      error: Errors.INSUFFICIENT_LIQUIDITY,
      ordersToFill: [] as SignedOrder[],
      amounts: [] as BigNumber[],
      sumInput: new BigNumber(0),
    }
  }
  let neededMakerAmount = amount // needed maker asset

  const ordersToFill: SignedOrder[] = []
  // amounts to fill for each order (rounded)
  const amounts: BigNumber[] = []

  for (const { metaData, order } of orderInfos) {
    const fillableTakerAmount = new BigNumber(metaData.remainingFillableTakerAmount)

    const fillableMakerAmount = new BigNumber(order.makerAmount)
      .times(fillableTakerAmount)
      .div(new BigNumber(order.takerAmount))
      .integerValue(BigNumber.ROUND_DOWN)

    ordersToFill.push(order)

    if (fillableMakerAmount.lt(neededMakerAmount)) {
      // takes all fillabe amount
      amounts.push(fillableTakerAmount)
      neededMakerAmount = neededMakerAmount.minus(fillableMakerAmount)
    } else {
      // only fill partial of the order
      const requiredTakerAsset = fillableTakerAmount.times(neededMakerAmount).div(fillableMakerAmount)
      amounts.push(requiredTakerAsset.integerValue(BigNumber.ROUND_CEIL))
      neededMakerAmount = new BigNumber(0)
      break
    }
  }

  if (neededMakerAmount.gt(new BigNumber(0))) {
    return {
      error: Errors.INSUFFICIENT_LIQUIDITY,
      ordersToFill: [] as SignedOrder[],
      amounts: [] as BigNumber[],
      sumInput: new BigNumber(0),
    }
  }

  // sum all amounts
  const sumInput = amounts.reduce((prev, curr) => prev.plus(curr), new BigNumber(0))

  return {
    error: Errors.NO_ERROR,
    ordersToFill,
    amounts,
    sumInput: sumInput.integerValue(),
  }
}