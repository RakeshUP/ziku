
import UpArrowCircleIcon from "../../assets/UpArrowCircle";
import { OptionType, TradeActions, useTradeState } from "../../context/TradeNow";

const StepTwo = () => {
  const { tradeState: { asset }, dispatch } = useTradeState();

  return (
    <>
      <div
        className="w-1/2 mr-2 p-6 border-2 border-gray-700 hover:border-cyan cursor-pointer rounded-xl flex flex-col justify-between space-y-6"
        onClick={() => dispatch({ type: TradeActions.OPTION_TYPE_SELECTED, payload: OptionType.CALLS })}
      >
        <div>
          <p className="flex items-center text-4xl opacity-90">
            Go up
            <UpArrowCircleIcon className="w-12 h-12 ml-2" />
          </p>
          <div className="mt-6 text-white text-opacity-70 leading-relaxed tracking-wide font-light">
            <div className="flex space-x-1">
              <p>1.</p>
              <p>Select a price(strike price) you think {asset[0].toUpperCase()}{asset.slice(1)} will rise above given an expiry date</p>
            </div>
            <div className="flex space-x-1">
              <p>2.</p>
              <p>Pay a small premium for buying the option</p>
            </div>
            <div className="flex space-x-1">
              <p>3.</p>
              <p>If it surpasses the strike price, you have the right to buy the asset at the strike price.</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 ml-2 p-6 border-2 border-gray-700 hover:border-cyan cursor-pointer rounded-xl flex flex-col justify-between space-y-6"
        onClick={() => dispatch({ type: TradeActions.OPTION_TYPE_SELECTED, payload: OptionType.PUTS })}
      >
        <div>
          <p className="flex items-center text-4xl opacity-90">
            Go down
            <UpArrowCircleIcon className="w-12 h-12 ml-2 transform rotate-180" />
          </p>
          <div className="mt-6 text-white text-opacity-70 leading-relaxed tracking-wide font-light">
            <div className="flex space-x-1">
              <p>1.</p>
              <p>Select a price(strike price) you think {asset[0].toUpperCase()}{asset.slice(1)} will fall below given an expiry date</p>
            </div>
            <div className="flex space-x-1">
              <p>2.</p>
              <p>Pay a small premium for buying the option</p>
            </div>
            <div className="flex space-x-1">
              <p>3.</p>
              <p>If it goes below the strike price, you have the right to buy the asset at the strike price.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;