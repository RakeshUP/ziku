import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import zeroXAbi from '../abis/0x.json';
import { useWallet } from '../context/wallet';
import { SignedOrder } from '../types';
import { ZX_EXCHANGE } from '../utils/address';
import { useGasPrice } from './useGasPrice';

type FillOrderArgs = {
  orders: SignedOrder[];
  amounts: BigNumber[];
};

const FEE_PERORDER_PER_GWEI = 0.00007

export const use0x = () => {
  const { network, web3, address, signer } = useWallet();

  const { fast, fastest } = useGasPrice(5)


  const getGasPriceForOrders = useCallback(
    (orders: SignedOrder[]) => {
      const closestExpiry = Math.min(...orders.map(o => Number(o.expiry) - Date.now() / 1000))
      return closestExpiry < 120 ? fastest : fast
    },
    [fast, fastest],
  )

  /**
   * If any order is expiring within 2 mins, use fastest
   */
   const getProtocolFee = useCallback(
    (orderInfos: SignedOrder[]) => {
      const gasPrice = getGasPriceForOrders(orderInfos)
      return gasPrice.times(new BigNumber(orderInfos.length)).times(FEE_PERORDER_PER_GWEI)
    },
    [getGasPriceForOrders],
  )

  const fillOrders = useCallback(
    async (orders: SignedOrder[], amounts: BigNumber[]) => {
      const exchange = new web3.eth.Contract(zeroXAbi as any, ZX_EXCHANGE[network])

      const signatures = orders.map(order => order.signature)

      const gasPrice = getGasPriceForOrders(orders)
      const feeInEth = getProtocolFee(orders).toString()
      const amountsStr = amounts.map(amount => amount.toString())

      console.log(`only filling first order la, orders[0]`, orders[0])

      // change to batch Fill when it's live
      await exchange.methods
        .batchFillLimitOrders(orders, signatures, amountsStr, false)
        .send({
          from: address,
          value: web3.utils.toWei(feeInEth, 'ether'),
          gasPrice: web3.utils.toWei(gasPrice.toString(), 'gwei'),
        })
        .on('transactionHash', console.log)

    },
    [network, getProtocolFee, getGasPriceForOrders, address, web3],
  )

  return { fillOrders }
};

export default use0x;
