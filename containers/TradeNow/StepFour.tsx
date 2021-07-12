
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import BigNumber from "bignumber.js";

import { useTradeState } from "../../context/TradeNow";
import { useWallet } from "../../context/wallet";
import { useBalance } from "../../hooks/useBalance";
import useOrders from "../../hooks/useOrders";
import { calculateOrderInput } from "../../utils/0x-util";
import { USDC } from "../../utils/address";
import { fromTokenAmount, toTokenAmount } from "../../utils/calculations";
import { SignedOrder } from "../../types";
import use0x from "../../hooks/use0x";
import { useUserAllowance } from "../../hooks/useAllowance";

const StepTwo = () => {
  const { tradeState: { selectedOtoken } } = useTradeState();
  const { asks, maxAmount } = useOrders(selectedOtoken?.id);
  const { network } = useWallet();
  const usdcBalance = useBalance(USDC[network]);
  const { fillOrders } = use0x();
  const { isLoadingAllowance, approve, allowance } = useUserAllowance(USDC[network]);
  
  const [amount, setAmount] = useState('1');
  const [sumAmount, setSumAmount] = useState(new BigNumber(0));
  const [ordersToFill, setOrdersToFill] = useState<SignedOrder[]>([]);
  const [amountsToFill, setAmountsToFill] = useState<BigNumber[]>([]);
  const [approving, setApproving] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  useEffect(() => {
    const rawAmount = fromTokenAmount(new BigNumber(amount), selectedOtoken.decimals)
    const { error, ordersToFill, amounts, sumInput } = calculateOrderInput(asks, rawAmount);

    setSumAmount(sumInput);
    setOrdersToFill(ordersToFill);
    setAmountsToFill(amounts);
    console.log(ordersToFill, amounts, sumInput, error)
  }, [amount])

  const buy = () => {
    fillOrders(ordersToFill, amountsToFill);
  }

  const approveUsdc = async () => {
    setApproving(true);
    try {
      await approve(sumAmount);
    } catch(e) {
      console.log(e)
    }
    setApproving(false);
  }

  if(transactionLoading) {
    return (
      <div className="w-full p-4 border-2 border-gray-700 rounded-xl text-xl flex flex-col justify-center items-center">
        <motion.div 
          animate={{ scale: [1, 1.2, 0.8, 1] }}
          transition={{ times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 0.5 }}
        >
          Loading
        </motion.div>
        <button 
          onClick={() => buy()}
          className="text-lg px-4 py-1.5 rounded-lg font-medium gradient-element transform transition-all duration-100 focus:outline-none hover:scale-95 block mx-auto mt-10">
          Open Etherscan
        </button>
      </div>
    )
  }

  return (
    <div className="w-full p-4 border-2 border-gray-700 rounded-xl text-xl">
      <div className="flex flex-col items-center space-y-3">
        <p className="opacity-70 text-base">Option amount</p>
        <div className="border-2 border-gray-700 rounded-xl p-2 flex">
          <button 
            onClick={() => setAmount(toTokenAmount(maxAmount, 8).toString())}
            className="text-lg px-2 py-0.5 rounded-lg font-medium gradient-element focus:outline-none">MAX</button>
          <input
            type="number"
            className="w-full bg-surface text-right focus:outline-none placeholder-white placeholder-opacity-25"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center space-y-1">
        <p className="opacity-70 text-base">USDC balance</p>
        <p>${toTokenAmount(usdcBalance, 6).toNumber()}</p>
      </div>
      <div className="mt-6 flex flex-col items-center space-y-1">
        <p className="opacity-70 text-base">Amount to pay</p>
        <p>${toTokenAmount(sumAmount, 6).toNumber()}</p>
      </div>
      <div>
      { isLoadingAllowance ? 
        <button 
          className="text-lg px-4 py-1.5 rounded-lg font-medium gradient-element transform transition-all duration-100 focus:outline-none hover:scale-95 block mx-auto mt-10">
          Loading
        </button> :
        allowance.lt(sumAmount) ?
        <button 
          onClick={() => approveUsdc()}
          className="text-lg px-4 py-1.5 rounded-lg font-medium gradient-element transform transition-all duration-100 focus:outline-none hover:scale-95 block mx-auto mt-10">
          {approving ? 'Approving...' : 'Approve'} 
        </button> :
        <button 
          onClick={() => buy()}
          className="text-lg px-4 py-1.5 rounded-lg font-medium gradient-element transform transition-all duration-100 focus:outline-none hover:scale-95 block mx-auto mt-10">
          Buy
        </button>
      }   
      </div>
    </div>
  );
};

export default StepTwo;