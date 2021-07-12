import React, { useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { OptionType, TradeActions, useTradeState } from "../../context/TradeNow";
import useCoinPrice from "../../hooks/useCoinPrice";
import useOrders from "../../hooks/useOrders";
import { otokens_otokens } from "../../queries/__generated__/otokens";
import { toTokenAmount } from "../../utils/calculations";

const ZikuTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#282A2D',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    fontFamily: 'inherit',
  },
}))(Tooltip);

type StepThreeProps = {
  options: any;
};

const StepThree: React.FC<StepThreeProps> = ({ options }) => {
  const { tradeState: { asset, optionType, selectedOtoken }, dispatch } = useTradeState();
  const assetPrice = useCoinPrice(asset);
  const [selectedDate, setSelectedDate] = useState<string>(Object.keys(options)[0]);
  const [guessPrice, setGuessPrice] = useState(toTokenAmount(options[selectedDate][options[selectedDate].length - 1].strikePrice, 8).toNumber())
  const [selectedOToken, setSelectedOToken] = useState<otokens_otokens | null>(selectedOtoken);
  const { asks, bestPrice } = useOrders(selectedOToken?.id)

  console.log(options[selectedDate][options[selectedDate].length - 1]);

  return (
    <div className="w-full p-4 border-2 border-gray-700 rounded-xl flex text-xl">
      <div className="w-7/12 flex flex-col">
        <div className="flex justify-between items-baseline">
          <p className="flex-shrink-0 mr-6">Strike price</p>
          <div className="border-2 border-gray-700 rounded-xl p-2 flex">
            <p className="text-lg px-2 py-0.5 rounded-lg font-medium gradient-element">USD</p>
            <input
              className="w-full bg-surface text-right focus:outline-none placeholder-white placeholder-opacity-25"
              value={guessPrice}
              onChange={e => setGuessPrice(parseInt(e.target.value) || 0)}
              placeholder={`${assetPrice.toNumber()}`}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between items-baseline">
          <p className="flex-shrink-0 mr-4">Expiration date</p>
          <div className="border-2 border-gray-700 rounded-xl p-2 flex">
            <select
              className="bg-surface focus:outline-none text-lg"
              onChange={e => setSelectedDate(e.target.value)}
              defaultValue={selectedDate}
            >
              {Object.keys(options).map((val) =>
                <option key={val} value={val}>
                  {new Date(parseInt(val) * 1000).toDateString()}
                </option>)}
            </select>
          </div>
        </div>
        <h1 className="mt-10">Available {optionType.substr(0, optionType.length - 1)} options for {asset[0].toUpperCase()}{asset.slice(1)}</h1>
        <div className="mt-4 overflow-scroll flex-1 grid grid-cols-2 grid-flow-row auto-rows-max gap-2">
          {options[selectedDate].map((item: otokens_otokens) => {
            const strikePrice = toTokenAmount(item.strikePrice, 8).toNumber();
            if (strikePrice > guessPrice) return;

            return (
              <button
                onClick={() => setSelectedOToken(item)}
                className={`rounded-xl px-4 py-2 text-sm gradient-element transform hover:scale-95 transition-all duration-100 focus:outline-none`}
              >
                $
                <span className="text-xl">{strikePrice}</span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="w-5/12 flex flex-col justify-between space-y-2 pl-4">
        <div className="flex-1 border-2 border-gray-700 rounded-xl p-3 text-center flex flex-col justify-center">
          <h1 className="ml-4 text-base font-light opacity-80">
            Premium cost 
            <ZikuTooltip 
              title="Premium is the current market price of the option contract. This will be your maximum loss"
              placement="right"
            >
              <IconButton className="ml-1 h-4 w-4">
                <InfoIcon fontSize="small" className="ml-1 -mt-1 text-gray-300"/>
              </IconButton>
            </ZikuTooltip>
          </h1>
          <p className="mt-1">{bestPrice === Infinity ? 'N/A' : `$${bestPrice}`}</p>
        </div>
        <div className="flex-1 border-2 border-gray-700 rounded-xl p-3 text-center flex flex-col justify-center">
          <h1 className="ml-4 text-base font-light opacity-80">
            Strike price
            <ZikuTooltip 
              title={optionType === OptionType.CALLS ? 
                  `The strike price is where ${asset[0].toUpperCase()}${asset.slice(1)} can be bought by the you upon option expiration`
                  : `The strike price is where ${asset[0].toUpperCase()}${asset.slice(1)} can be sold by the you upon option expiration`
                } 
              placement="right"
            >
              <IconButton className="ml-1 h-4 w-4">
                <InfoIcon fontSize="small" className="ml-1 -mt-1 text-gray-300"/>
              </IconButton>
            </ZikuTooltip>
          </h1>
          <p className="mt-1">${toTokenAmount(selectedOToken?.strikePrice, 8).toNumber()}</p>
        </div>
        <div className="flex-1 border-2 border-gray-700 rounded-xl p-3 text-center flex flex-col justify-center">
          <h1 className="ml-4 text-base font-light opacity-80">
            Break even
            <ZikuTooltip 
              title={ optionType === OptionType.CALLS ? 
                  `The amount that ${asset[0].toUpperCase()}${asset.slice(1)} has to surpass for you to make a profit`
                  : `The amount that ${asset[0].toUpperCase()}${asset.slice(1)} has to go below for you to make a profit`
                }
              placement="right"
            >
              <IconButton className="ml-1 h-4 w-4">
                <InfoIcon fontSize="small" className="ml-1 -mt-1 text-gray-300"/>
              </IconButton>
            </ZikuTooltip>
          </h1>
          <p className="mt-1">{bestPrice === Infinity? 'N/A' : toTokenAmount(selectedOToken?.strikePrice, 8).toNumber() + bestPrice}</p>
        </div>
        <button
          disabled={selectedOToken === null || bestPrice === Infinity}
          onClick={() => dispatch({ type: TradeActions.OPTION_SELECTED, payload: selectedOToken })}
          className={`rounded-xl px-4 py-2 text-sm gradient-element transform transition-all duration-100 focus:outline-none
                      ${selectedOToken === null || bestPrice === Infinity ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-95'}`}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default StepThree;