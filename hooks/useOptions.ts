import { useQuery } from "@apollo/client"
import { OPTIONS_QUERY } from '../queries/optionsQuery';
import { otokens, otokensVariables, otokens_otokens} from '../queries/__generated__/otokens';
import { useEffect, useState } from "react";


const useOptions = () => {
  const parsedOptions = {
    WETH: { puts: {}, calls: {} },
    WBTC: { puts: {}, calls: {} },
  }
  const current = parseInt((Date.now() / 1000).toString());
  const { data, loading } = useQuery<otokens, otokensVariables>(OPTIONS_QUERY, { variables: { expiry: current }});

  useEffect(() => {
    if (loading) return;
    const oTokens = data?.otokens.filter((o) => new Date(o.expiryTimestamp * 1000).getUTCDay() === 5 && ['WETH','WBTC'].includes(o.collateralAsset.symbol))

    for (const option of oTokens) {
      if (option.underlyingAsset.symbol === option.collateralAsset.symbol) {
        if (!parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp]) {
          parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp] = []
        }
        parsedOptions[option.underlyingAsset.symbol].calls[option.expiryTimestamp].push(option)
      } else if (option.strikeAsset.symbol === option.collateralAsset.symbol) {
        if (!parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp]) {
          parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp] = []
        }
        parsedOptions[option.underlyingAsset.symbol].puts[option.expiryTimestamp].push(option)
      }
    }
  }, [loading])

  return { options: data?.otokens || [], parsedOptions , loading }
};

export default useOptions;
