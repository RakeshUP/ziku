import UpArrowIcon from "../../assets/UpArrow";
import { Steps, TradeActions, useTradeState } from "../../context/TradeNow";

const HorizontalStepper = () => {
  const { tradeState: { step, mostForwardStep }, dispatch } = useTradeState();

  return (
    <div className="lg:hidden mb-6 flex items-center justify-center space-x-3">
      <button
        disabled={step <= 1}
        className={`p-3.5 rounded-full bg-overlayLight group focus:outline-none ${step <= 1 && 'opacity-25 cursor-default'}`}
        onClick={() => dispatch({ type: TradeActions.GO_BACK })}
      >
        <UpArrowIcon className={`w-5 h-5 ${step > 1 && 'opacity-70 group-hover:opacity-100'}`} />
      </button>
      <button
        disabled={step >= Object.keys(Steps).length / 2 || step >= mostForwardStep}
        className={`p-3.5 rounded-full bg-overlayLight group focus:outline-none ${(step >= Object.keys(Steps).length / 2 || step >= mostForwardStep) && 'opacity-25 cursor-default'}`}
        onClick={() => dispatch({ type: TradeActions.GO_FORWARD })}
      >
        <UpArrowIcon className={`w-5 h-5 transform rotate-180 ${step < Object.keys(Steps).length / 2 && 'opacity-70 group-hover:opacity-100'}`} />
      </button>
      <div className="text-xs text-center tracking-widest font-medium opacity-60">
        0{step}/0{Object.keys(Steps).length / 2}
      </div>
    </div>
  );
};

export default HorizontalStepper;
