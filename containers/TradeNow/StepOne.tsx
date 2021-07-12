import useCoinPrice, { COINS } from "../../hooks/useCoinPrice";

import BitcoinIcon from "../../assets/Bitcoin";
import EthereumIcon from "../../assets/Ethereum";
import { TradeActions, useTradeState } from "../../context/TradeNow";

const StepOne = () => {
  const { dispatch } = useTradeState();
  const ethPrice = useCoinPrice(COINS.ETHEREUM);
  const btcPrice = useCoinPrice(COINS.BITCOIN);

  return (
    <>
      <div
        className="w-1/2 mr-2 p-4 border-2 border-gray-700 hover:border-cyan cursor-pointer rounded-xl flex flex-col justify-between space-y-6"
        onClick={() => dispatch({ type: TradeActions.ASSET_SELECTED, payload: COINS.ETHEREUM })}
      >
        <h1 className="px-2.5 py-1.5 rounded-lg bg-gray-700 w-max text-sm font-medium tracking-wide">WETH</h1>
        <EthereumIcon className="py-4" style={{ maxHeight: '16rem' }} />
        <div className="font-medium flex justify-between">
          <div>
            <p className="uppercase text-xs opacity-80">Current price</p>
            <p className="mt-1 text-xl">
              ${ethPrice.toNumber()}
            </p>
          </div>
          <div className="text-right">
            <p className="uppercase text-xs opacity-80">24h change</p>
            <p className="mt-1 text-xl">
              -1.61%
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 ml-2 p-4 border-2 border-gray-700 hover:border-cyan cursor-pointer rounded-xl flex flex-col justify-between space-y-6"
        onClick={() => dispatch({ type: TradeActions.ASSET_SELECTED, payload: COINS.BITCOIN })}
      >
        <h1 className="px-2.5 py-1.5 rounded-lg bg-gray-700 w-max text-sm font-medium tracking-wide">WBTC</h1>
        <BitcoinIcon className="py-4" style={{ maxHeight: '16rem' }} />
        <div className="font-medium flex justify-between">
          <div>
            <p className="uppercase text-xs opacity-80">Current price</p>
            <p className="mt-1 text-xl">
              ${btcPrice.toNumber()}
            </p>
          </div>
          <div className="text-right">
            <p className="uppercase text-xs opacity-80">24h change</p>
            <p className="mt-1 text-xl">
              -1.61%
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepOne;
