import { motion, AnimatePresence } from 'framer-motion';

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Steps, useTradeState } from "../../context/TradeNow";
import Stepper from "./Stepper";

type TradeNowProps = {
  tradeRef: React.MutableRefObject<HTMLDivElement>;
  options: any;
  parsedOptions: any;
}

const TradeNow: React.FC<TradeNowProps> = ({ tradeRef, parsedOptions }) => {
  const { tradeState: { step, asset, optionType } } = useTradeState();

  const questionText = () => {
    if (step === Steps.SELECT_ASSET) {
      return 'Choose an asset';
    } else if (step === Steps.EXPLAIN) {
      return `What will happen to the price of ${asset[0].toUpperCase()}${asset.slice(1)}?`;
    } else if (step === Steps.SELECT_OPTION) {
      return 'Select an expiration date and a strike price';
    } else if (step === Steps.BUY) {
      return 'Enter amount of options and buy';
    }
  }

  return (
    <section className="mt-24 lg:mt-32 max-w-screen-xl mx-auto pt-8" ref={tradeRef}>
      <h1 className="text-5xl font-extrabold text-center gradient-text mb-12">
        Trade now.
      </h1>
      <h2 className="max-w-screen-sm mx-auto text-xl font-medium text-center text-gray-300 mb-8">
        {questionText()}
      </h2>
      <div className="max-w-screen-sm mx-auto relative" style={{ minHeight: '27rem' }}>
        <Stepper />
        <AnimatePresence>
          {step === Steps.SELECT_ASSET && (
            <motion.div
              initial={{ y: '7%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full flex justify-center h-full"
            >
              <StepOne />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === Steps.EXPLAIN && (
            <motion.div
              initial={{ y: '7%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full flex justify-center h-full absolute"
            >
              <StepTwo />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === Steps.SELECT_OPTION && (
            <motion.div
              initial={{ y: '7%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full flex justify-center h-full absolute"
            >
              <StepThree options={parsedOptions.WETH[optionType]} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === Steps.BUY && (
            <motion.div
              initial={{ y: '7%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full flex justify-center h-full absolute"
            >
              <StepFour />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TradeNow;