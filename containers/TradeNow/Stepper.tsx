import UpArrowIcon from "../../assets/UpArrow";
import { Steps, TradeActions, useTradeState } from "../../context/TradeNow";

const Stepper = () => {
  const { tradeState: { step, mostForwardStep }, dispatch } = useTradeState();

  return (
    <div className="absolute left-0 transform -translate-x-2-full flex flex-col">
      <button
        disabled={step <= 1}
        className={`p-3.5 rounded-full bg-overlay group focus:outline-none ${step <= 1 && 'opacity-25 cursor-default'}`}
        onClick={() => dispatch({ type: TradeActions.GO_BACK })}
      >
        <UpArrowIcon className={`w-5 h-5 ${step > 1 && 'opacity-70 group-hover:opacity-100'}`} />
      </button>
      <button
        disabled={step >= Object.keys(Steps).length / 2 || step >= mostForwardStep}
        className={`mt-4 p-3.5 rounded-full bg-overlay group focus:outline-none ${(step >= Object.keys(Steps).length / 2 || step >= mostForwardStep) && 'opacity-25 cursor-default'}`}
        onClick={() => dispatch({ type: TradeActions.GO_FORWARD })}
      >
        <UpArrowIcon className={`w-5 h-5 transform rotate-180 ${step < Object.keys(Steps).length / 2 && 'opacity-70 group-hover:opacity-100'}`} />
      </button>
      <div className="mt-4 text-xs text-center tracking-widest font-medium opacity-50">
        0{step}/0{Object.keys(Steps).length / 2}
      </div>
    </div>
  );
};

export default Stepper;
